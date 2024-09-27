import { Router } from 'express';
import { validateSession } from '../../auth/controllers/sessionController.js';
import validateJwt from '../../auth/middleware/validateJwt.js';
import { createSubjectCtrl, updateSubjectCtrl, deleteSubjectCtrl, getUserSubjectsCtrl } from '../controller/subjectController.js';

const subjectRoute = Router();

// Ruta para obtener todas las materias del usuario autenticado
subjectRoute.get('/subjects', validateJwt, getUserSubjectsCtrl);

// Ruta para crear una nueva materia para el usuario autenticado
subjectRoute.post('/subjects', validateJwt, createSubjectCtrl);

// Ruta para editar una materia del usuario autenticado
subjectRoute.put('/subjects/:id', validateJwt, updateSubjectCtrl);

// Ruta para eliminar una materia del usuario autenticado
subjectRoute.delete('/subjects/:id', validateJwt, deleteSubjectCtrl);

export default subjectRoute;
