import { Router } from 'express';
import { signUpUser, signInUser } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/signup', signUpUser);
authRouter.post('/signin', signInUser);
