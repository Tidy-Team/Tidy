import express from 'express';
import authRouter from './components/auth/routes/authRoutes.js';
import activitiesRoutes from './components/activities/routes/activitiesRoute.js';

import { initMiddleware } from './middlewares/index.js';
import { PORT } from './config/env.js';

const app = express();

//Middleware
initMiddleware(app);
//Routes
app.use('/', authRouter);
app.use('/', activitiesRoutes);
//Server
app.listen(PORT, () => {
  console.log(`http//localhost:${PORT}`);
});
