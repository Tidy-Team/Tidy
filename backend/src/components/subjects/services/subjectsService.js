import { Subjects } from '../models/subjectModel.js';

/**
 * Busca una materia por su ID y el ID del usuario.
 * @param {number} subjectId - ID de la materia.
 * @param {number} userId - ID del usuario.
 * @returns {Promise<Object>} - Materia encontrada.
 * @throws {Error} - Si la materia no es encontrada.
 */
export const findSubjectByIdAndUserId = async (subjectId, userId) => {
  try {
    const findSubject = await Subjects.findOne({
      where: { id: subjectId, userId },
    });

    if (!findSubject) {
      throw new Error('Materia no encontrada');
    }

    return findSubject;
  } catch (error) {
    console.error(
      `Error al buscar materia con id: ${subjectId}. Su error es: ${error.message}`
    );

    throw error;
  }
};
