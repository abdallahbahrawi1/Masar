import express from 'express';
import { changeUsername, changePassword, createUser, loginUser, logoutUser, getUserDetails, updateUserDetails, deleteUserAccount } from '../Controllers/userController';
import checkAuthenticated from '../Middlewares/checkAuthenticated'

const router = express.Router();

router.post('/signin', loginUser);
router.post('/signup', createUser);
router.get('/signout', checkAuthenticated, logoutUser);
router.put('/change-password', checkAuthenticated, changePassword);
router.put('/change-username', checkAuthenticated, changeUsername);
router.get('/:user_id', checkAuthenticated, getUserDetails);
router.put('/:user_id', checkAuthenticated, updateUserDetails);
router.delete('/:user_id', checkAuthenticated, deleteUserAccount);




export default router;
