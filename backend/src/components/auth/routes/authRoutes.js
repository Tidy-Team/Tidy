import validateJwt from '../middleware/validateJwt.js';

import { Router } from 'express';
import { signUpUser, signInUser } from '../controllers/authController.js';
import { validateSession } from '../controllers/sessionController.js';
<<<<<<< HEAD
=======

import validateJwt from '../middleware/validateJwt.js';
>>>>>>> db194eba6c948aa733125991b0ca5899dcf09642

const authRouter = Router();

// Endpoint de inicio de sesión
authRouter.post('/signup', signUpUser);

// Endpoint de cierre de sesión
authRouter.post('/signin', signInUser);

// Endpoint para validar la sesión
authRouter.get('/session', validateJwt, validateSession);
<<<<<<< HEAD

export default authRouter;
=======
>>>>>>> db194eba6c948aa733125991b0ca5899dcf09642
