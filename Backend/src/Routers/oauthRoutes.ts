import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import db from "../Database/Models";

// async function getUserData(access_token) {

//   const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
  
//   console.log('response',response);
//   const data = await response.json();
//   console.log('data',data);
// }

/* GET home page. */
router.get('/', async (req, res, next) => {
  const code = req.query.code;

  try {
    const redirectURL = "http://127.0.0.1:4000/oauth"
    const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        redirectURL
      );
    const r =  await oAuth2Client.getToken(code);
    // Make sure to set the credentials on the OAuth2 client.
    await oAuth2Client.setCredentials(r.tokens);
    console.info('Tokens acquired.');
    const user = oAuth2Client.credentials;
    // console.log('credentials',user);
    // await getUserData(oAuth2Client.credentials.access_token);
    const ticket = await oAuth2Client.verifyIdToken({idToken: user.id_token, audience: process.env.GOOGLE_CLIENT_ID})
    // console.log("ticket", ticket)
    const payload = ticket.getPayload();

    const userID = payload['sub'];
    const name = payload['name'];
    const email = payload['email'];
    const picture = payload['picture'];
    const appUser = {
      userID,
      name,
      email,
      picture
    }

    const existingEmail = await db.users.findOne({ where: { email } });
    if (!existingEmail) {
      await db.users.create({
        email,
        first_name: name.split(" ")[0],
        last_name: name.split(" ")[1],
      });
    }
    req.session.user = appUser
    res.redirect(303, 'http://localhost:3000/');
  } catch (err) {
    console.log('Error logging in with OAuth2 user', err);
    res.status(500).send('Internal Server Error');
  }
  // res.redirect(303, 'http://localhost:3000/');
});

router.post('/', async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header("Access-Control-Allow-Credentials", 'true');
  res.header("Referrer-Policy","no-referrer-when-downgrade");
  const redirectURL = 'http://127.0.0.1:4000/oauth';
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectURL
  );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile  openid ',
    prompt: 'consent'
  });

  res.json({url:authorizeUrl})
  
});

export default router;
