import express from 'express';
import authRouter from './components/auth/routes/authRoutes.js';
import activitiesRoutes from './components/activities/routes/activitiesRoute.js';
import subjectRoute from './components/subjects/routes/subjectRoute.js';

import { initMiddleware } from './middlewares/index.js';
import { PORT } from './config/env.js';
import { swaggerUi, swaggerDocument } from './config/swaggerConfig.js';

const app = express();

// Middleware
initMiddleware(app);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/', authRouter);
app.use('/', activitiesRoutes);
app.use('/', subjectRoute);
//Server
app.listen(PORT, () => {
  console.log(`http//localhost:${PORT}`);
});
