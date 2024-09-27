import subjectSchema from '../schemas/subjectSchema.js';
import { ZodError } from 'zod';
import { createSubject, deleteSubject, updateSubject, getUserSubjects } from '../services/subjectsService.js';

/**
 * Controlador para obtener todas las materias del usuario autenticado
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
export const getUserSubjectsCtrl = async (req, res) => {
  const userId = req.user.id;

  try {
    const subjects = await getUserSubjects(userId);

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para crear una nueva materia para el usuario autenticado
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
export const createSubjectCtrl = async (req, res) => {
  try {
    // Validar los datos de la solicitud usando el esquema
    const validatedData = subjectSchema.parse(req.body);

    const { subjectName, description, name_teacher } = validatedData;
    const userId = req.user.id;

    const newSubject = await createSubject(userId, { subjectName, description, name_teacher });

    res.status(201).json({
      message: 'Materia creada exitosamente',
      subject: newSubject,
    });
  } catch (error) {
    //Zod Errors
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors,
      });
    }
    console.error(`Error al crear la materia para el usuario con id: ${req.user.id}. Su error es: ${error.message}`);
    res.status(500).json({
      message: 'Error al crear la materia',
      error: error.message,
    });
  }
};

/**
 * Controlador para editar una materia del usuario autenticado
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
export const updateSubjectCtrl = async (req, res) => {
  try {
    // Validar los datos de la solicitud usando el esquema
    const validatedData = subjectSchema.parse(req.body);

    const { subjectName, description, name_teacher } = validatedData;
    const { id } = req.params; // Obtenemos el id de la materia a editar
    const userId = req.user.id;

    const updatedSubject = await updateSubject(userId, id, { subjectName, description, name_teacher });

    res.status(200).json(updatedSubject);
  } catch (error) {
    //Zod Error
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Error de validación',
        errors: error.errors,
      });
    }
    res.status(500).json({ message: error.message });
  }
};

/**
 * Controlador para eliminar una materia del usuario autenticado
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
export const deleteSubjectCtrl = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await deleteSubject(userId, id);

    res.status(200).json({ message: 'Materia eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
