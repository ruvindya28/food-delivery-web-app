import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';


const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/is-auth',authUser,isAuth);
userRouter.get('/logout',authUser,logout);

export default userRouter;