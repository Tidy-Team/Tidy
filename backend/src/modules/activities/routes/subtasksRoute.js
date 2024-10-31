import { Router } from 'express';
import { subtasksByIdCtrl, updateSubtasksCtrl } from '../controller/subtasksController.js';

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

// Definir la ruta para actualizar una subtarea por su ID
subtaskRoute.put(
  '/activities/:idActivity/subtasks/:idSubtask',
  logEndpointAccess('/activities/:idActivity/subtasks/:idSubtask'),
  validateJwt,
  updateSubtasksCtrl
);

export default subtaskRoute;
