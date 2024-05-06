import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import passport from 'passport';
const router = express.Router();

router.get("/login/failed", (req, res) => {
    res.status(401).json({ 
        seccess: false,
        message: "failure",
    });
})

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
  

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed"
}))

export default router