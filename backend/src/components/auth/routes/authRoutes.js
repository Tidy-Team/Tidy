import { Router } from 'express';

export const authRouter = Router();

authRouter.post('/signup', (req, res) => {
  res.json('hola');
});
