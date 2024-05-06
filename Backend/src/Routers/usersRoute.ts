import express from 'express';
import { changePassword, createUser, loginUser, logoutUser, getUserDetails, getUsersDetails, updateUserDetails, deleteUserAccount } from '../Controllers/userController';
import checkAuthenticated from '../Middlewares/checkAuthenticated'
const router = express.Router();

router.get('/get-users', checkAuthenticated, getUsersDetails);
router.post('/signin', loginUser);
router.get('/signin', checkAuthenticated, (req,res)=>{
    res.json({ loggedIn: true, user: req.session.user ? req.session.user : req.session.passport.user});
});
router.post('/signup', createUser);
router.get('/signout', checkAuthenticated, logoutUser);
router.put('/change-password', checkAuthenticated, changePassword);
router.get('/:user_id', checkAuthenticated, getUserDetails);
router.put('/:user_id', checkAuthenticated, updateUserDetails);


// router.get('/:user_id', checkAuthenticated, getUserDetails);
// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {}))
// router.delete('/:user_id', checkAuthenticated, deleteUserAccount);


export default router;
