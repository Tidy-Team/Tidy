import express from 'express';
import { initMiddleware } from './middlewares/index.js';
import { PORT } from './config/env.js';
import { authRouter } from './components/auth/routes/authRoutes.js';

const app = express();

//Middleware
initMiddleware(app);
//Routes
app.use('/', authRouter);

//Server
app.listen(PORT, () => {
  console.log(`http//localhost:${PORT}`);
});
