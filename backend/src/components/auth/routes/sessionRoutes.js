import { Router } from 'express';
import {
  createSession,
  validateSession,
} from '../controllers/sessionController.js';
import validateJwt from '../middleware/validateJwt.js';

export const sessionRoutes = Router();

sessionRoutes.post('/session', createSession);
sessionRoutes.get('/session/validate', validateJwt, validateSession);
