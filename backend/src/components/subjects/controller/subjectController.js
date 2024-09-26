import {
  findSubjectByIdAndUserId,
  createSubject,
  deleteSubject,
  updateSubject,
  getUserSubjects,
} from '../services/subjectsService';

/**
 * Controlador para obtener todas las materias del usuario autenticado
 * @param {Object} req - Objeto de solicitud
 * @param {Object} res - Objeto de respuesta
 */
export const getUserSubjects = async (req, res) => {
  const userId = req.userId;

  try {
    const subjects = await getUserSubjects(userId);

    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createSubject = async (req, res) => {
  const { subjectName, description, name_teacher } = req.body;
  const userId = req.userId;

  try {
    const newSubject = await createSubject(userId, { subjectName, description, name_teacher });

    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
