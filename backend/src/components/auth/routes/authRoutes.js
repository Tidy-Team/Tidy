import validateJwt from '../middleware/validateJwt.js';

import { Router } from 'express';
import {
  signUpUser,
  signInUser,
  requestPasswordResetCtrl,
  verifyResetTokenCtrl,
  resetPasswordCtrl,
  verifyEmail,
} from '../controllers/authController.js';
import { validateSession } from '../controllers/sessionController.js';

const authRouter = Router();

// Endpoint de inicio de sesión
authRouter.post('/signup', signUpUser);

// Endpoint de cierre de sesión
authRouter.post('/signin', signInUser);

// Endpoint para validar la sesión
authRouter.get('/session', validateJwt, validateSession);

// Enpoints de reset password
authRouter.post('/request-password-reset', requestPasswordResetCtrl);
authRouter.get('/reset-password/:token', verifyResetTokenCtrl);
authRouter.post('/reset-password/:token', resetPasswordCtrl);

// Enpoint de verificar email
authRouter.get('/verify-email/:token', verifyEmail);

export default authRouter;
