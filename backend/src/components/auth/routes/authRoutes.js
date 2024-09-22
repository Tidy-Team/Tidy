import { Router } from 'express';
import { signUpUser } from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post('/signup', signUpUser);
authRouter.post('/signin', res => {
  res.json('hola');
});
