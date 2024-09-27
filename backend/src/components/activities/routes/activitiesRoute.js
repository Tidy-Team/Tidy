import { Router } from 'express';

import validateJwt from '../../auth/middleware/validateJwt.js';
import { getActivities, createActivities, updateActivityCtrl, deleteActivityCtrl } from '../controller/activitiesController.js';

const activitiesRoutes = Router();

// Ruta para obtener todas las actividades de una materia específica
activitiesRoutes.get('/activities/:id', validateJwt, getActivities);

// Ruta para crear una nueva actividad en una materia específica
activitiesRoutes.post('/activities/:id', validateJwt, createActivities);

// Ruta para actualizar una actividad existente
activitiesRoutes.put('/activities/:id', validateJwt, updateActivityCtrl);

// Ruta para eliminar una actividad existente
activitiesRoutes.delete('/activities/:id', validateJwt, deleteActivityCtrl);

export default activitiesRoutes;
