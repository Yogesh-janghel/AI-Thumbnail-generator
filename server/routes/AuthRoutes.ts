import express from 'express';
import { loginUser, logoutUser, register, verifyUser } from '../controllers/AuthController.js';
import protect from '../middlewares/Auth.js';

const AuthRouter = express.Router();
AuthRouter.post('/register', register);
AuthRouter.post('/login', loginUser);
AuthRouter.get('/verify',protect, verifyUser)
AuthRouter.post('/logout', protect,logoutUser);
export default AuthRouter;