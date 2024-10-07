import express from 'express'
import expressPinoLogger from 'express-pino-logger'
import logger from './components/logger/config.js'

import authRouter from './components/auth/routes/authRoutes.js'
import activitiesRoutes from './components/activities/routes/activitiesRoute.js'
import subjectRoute from './components/subjects/routes/subjectRoute.js'

import { initMiddleware } from './middlewares/index.js'
import { PORT } from './config/env.js'
import { swaggerUi, swaggerDocument } from './config/swaggerConfig.js'
import { showLogo } from './components/logger/showLogo.js'

const app = express()
const expressLogger = expressPinoLogger({ logger })

// Middleware
// Middleware
initMiddleware(app)
app.use(expressLogger)

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Routes
app.use('/', authRouter)
app.use('/', activitiesRoutes)
app.use('/', subjectRoute)
//Server
app.listen(PORT, () => {
  showLogo()
  console.log(`http//localhost:${PORT}`)
})
