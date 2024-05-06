// import { Strategy as LocalStrategy } from 'passport-local';
// import bcrypt from "bcrypt";
// import { getUserByEmail, getUserById } from './Services/userService';

// function initialize(passport) {
//     const authenticateUser = async (email, password, done) => {
//       const user = getUserByEmail(email)
//       if (user == null) {
//         return done(null, false, { message: 'No user with that email' })
//       }
  
//       try {
//         if (await bcrypt.compare(password, user.password)) {
//           return done(null, user)
//         } else {
//           return done(null, false, { message: 'Password incorrect' })
//         }
//       } catch (e) {
//         return done(e)
//       }
//     }
  
//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => {
//       return done(null, getUserById(id))
//     })
//   }
  
//   export default initialize;
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    GOOGLE_CLIENT_ID:     process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));