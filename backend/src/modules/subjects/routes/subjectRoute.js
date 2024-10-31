<<<<<<< HEAD:backend/src/modules/subjects/routes/subjectRoute.js
import { Router } from 'express';
import { validateSession } from '../../auth/controllers/sessionController.js';
import validateJwt from '../../auth/middleware/validateJwt.js';
=======
import { Router } from 'express'
import { validateSession } from '../../auth/controllers/sessionController.js'
import validateJwt from '../../auth/middleware/validateJwt.js'
>>>>>>> dev_cuellaMateo:backend/src/components/subjects/routes/subjectRoute.js
import {
  createSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
  getUserSubjectsCtrl,
  getSubjectByIdCtrl,
<<<<<<< HEAD:backend/src/modules/subjects/routes/subjectRoute.js
} from '../controller/subjectController.js';
import { validationsZod } from '../../../middlewares/validationsZod.js';
import subjectSchema from '../schemas/subjectSchema.js';
import logEndpointAccess from '../../logger/middleware/loggerMiddleware.js';
=======
} from '../controller/subjectController.js'
import { validationsZod } from '../../../middlewares/validationsZod.js'
import subjectSchema from '../schemas/subjectSchema.js'
import logEndpointAccess from '../../logger/middleware/loggerMiddleware.js'
>>>>>>> dev_cuellaMateo:backend/src/components/subjects/routes/subjectRoute.js

const subjectRoute = Router()

// Ruta para obtener todas las materias del usuario autenticado
subjectRoute.get(
  '/subjects',
  logEndpointAccess('/subjects'),
  validateJwt,
  getUserSubjectsCtrl
)

// Ruta para una materia por Id  del usuario autenticado
subjectRoute.get(
  '/subjects/:id',
  logEndpointAccess('/subjects/:id'),
  validateJwt,
  getSubjectByIdCtrl
)

subjectRoute.get('/subjects/:id', logEndpointAccess('/subjects/:id'), validateJwt, getSubjectByIdCtrl);

// Ruta para crear una nueva materia para el usuario autenticado
subjectRoute.post(
  '/subjects',
  logEndpointAccess('/subjects'),
  validateJwt,
  validationsZod(subjectSchema),
  createSubjectCtrl
)

// Ruta para editar una materia del usuario autenticado
subjectRoute.put(
  '/subjects/:id',
  logEndpointAccess('/subjects/:id'),
  validateJwt,
  validationsZod(subjectSchema),
  updateSubjectCtrl
)

// Ruta para eliminar una materia del usuario autenticado
subjectRoute.delete(
  '/subjects/:id',
  logEndpointAccess('/subjects/:id'),
  validateJwt,
  deleteSubjectCtrl
)

export default subjectRoute