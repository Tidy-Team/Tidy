import { Router } from 'express';
import { subtasksByIdCtrl } from '../controller/subtasksController.js';

import logEndpointAccess from '../../logger/middleware/loggerMiddleware.js';
import validateJwt from '../../auth/middleware/validateJwt.js';

const subtaskRoute = Router();

// Definir la ruta para obtener una subtarea por su ID
subtaskRoute.get(
  '/subjects/:idSubject/activities/:idActivity/subtasks/:idSubtask',
  logEndpointAccess('/subjects/:idSubject/activities/:idActivity/subtasks/:idSubtask'),
  validateJwt,
  subtasksByIdCtrl
);

export default subtaskRoute;
