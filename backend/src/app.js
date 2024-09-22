import express from 'express';
import { initMiddleware } from './middlewares/index.js';
import { PORT } from './config/env.js';
import { authRouter } from './components/auth/routes/authRoutes.js';
import { sessionRoutes } from './components/auth/routes/sessionRoutes.js';

const app = express();

//Middleware
initMiddleware(app);
//Routes
app.use('/', sessionRoutes);
app.use('/', authRouter);

//Server
app.listen(PORT, () => {
  console.log(`http//localhost:${PORT}`);
});
