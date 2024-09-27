import { Router } from 'express';

import validateJwt from '../../auth/middleware/validateJwt.js';
import { getActivities, createActivities, updateActivityCtrl, deleteActivityCtrl } from '../controller/activitiesController.js';
import { validateSession } from '../../auth/controllers/sessionController.js';

const activitiesRoutes = Router();

// Ruta para obtener todas las actividades de una materia específica
activitiesRoutes.get('/activities/:id', validateJwt, validateSession, getActivities);

// Ruta para crear una nueva actividad en una materia específica
activitiesRoutes.post('/activities/:id', validateJwt, validateSession, createActivities);

// Ruta para actualizar una actividad existente
activitiesRoutes.put('/activities/:id', validateJwt, validateSession, updateActivityCtrl);

// Ruta para eliminar una actividad existente
activitiesRoutes.delete('/activities/:id', validateJwt, validateSession, deleteActivityCtrl);

export default activitiesRoutes;
