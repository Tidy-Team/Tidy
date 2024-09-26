import validateJwt from '../middleware/validateJwt.js';

import { Router } from 'express';
import { signUpUser, signInUser } from '../controllers/authController.js';
import { validateSession } from '../controllers/sessionController.js';

const authRouter = Router();

// Endpoint de inicio de sesión
authRouter.post('/signup', signUpUser);

// Endpoint de cierre de sesión
authRouter.post('/signin', signInUser);

// Endpoint para validar la sesión
authRouter.get('/session', validateJwt, validateSession);

export default authRouter;
