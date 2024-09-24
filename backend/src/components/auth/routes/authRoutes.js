import { Router } from 'express';
import { signUpUser, signInUser } from '../controllers/authController.js';

export const authRouter = Router();

// Endpoint de inicio de sesión
authRouter.post('/signup', signUpUser);

// Endpoint de cierre de sesión
authRouter.post('/signin', signInUser);

// Endpoint para validar la sesión
authRouter.get('/session', validarJwt, validateSessionCtrl);
