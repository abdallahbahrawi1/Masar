import dotenv from 'dotenv'
dotenv.config()

import db from "./Database/Models";
import passport from 'passport'
import GoogleStratrgy from 'passport-google-oauth20'


passport.use(
    new GoogleStratrgy({
        callbackURL: '/oauth/google/callback',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }, 
    async function(accessToken, refreshToken, profile, done) {

        const existingUser = await db.users.findOne({ 
            where: {
                googleID: profile.id
            } 
        });
        
        if (!existingUser) {
          const newUser = await db.users.create({
            googleID: profile.id,
            email: profile._json.email,
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            profile_image: profile._json.picture,
          });
          done(null, newUser)
        }

        done(null, existingUser)
    }
))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    const id = user.id
    const checkUser = await db.users.findOne({ id });
    done(null, checkUser)
})
