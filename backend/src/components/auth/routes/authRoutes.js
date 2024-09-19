import { Router } from 'express';
import { signUpUser } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/signup', signUpUser);
