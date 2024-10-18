import { Router } from 'express'
import {
  getActivities,
  createActivityCtrl,
  updateActivityCtrl,
  deleteActivityCtrl,
} from '../controller/activitiesController.js'

import validateJwt from '../../auth/middleware/validateJwt.js'
import { validationsZod } from '../../../middlewares/validationsZod.js'
import { activitiesSchema } from '../schemas/activitiesSchema.js'
import logEndpointAccess from '../../logger/middleware/loggerMiddleware.js'

const activitiesRoutes = Router()

// Ruta para obtener todas las actividades de una materia específica
activitiesRoutes.get(
  '/activities/:id',
  logEndpointAccess('/activities/:id'),
  validateJwt,
  getActivities
)

// Ruta para crear una nueva actividad en una materia específica
activitiesRoutes.post(
  '/activities/:id',
  logEndpointAccess('/activities/:id'),
  validateJwt,
  validationsZod(activitiesSchema),
  createActivityCtrl
)

// Ruta para actualizar una actividad existente
activitiesRoutes.put(
  '/activities/:id',
  logEndpointAccess('/activities/:id'),
  validateJwt,
  validationsZod(activitiesSchema),
  updateActivityCtrl
)

// Ruta para eliminar una actividad existente
activitiesRoutes.delete(
  '/activities/:id',
  logEndpointAccess('/activities/:id'),
  validateJwt,
  deleteActivityCtrl
)

export default activitiesRoutes
