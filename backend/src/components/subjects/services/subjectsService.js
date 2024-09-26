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
    const subject = await Subjects.findOne({
      where: { id: subjectId, userId },
    });

    if (!subject) {
      throw new Error('Materia no encontrada');
    }

    return subject;
  } catch (error) {
    console.error(`Error al buscar materia con id: ${subjectId}. Su error es: ${error.message}`);

    throw new Error('Error al encontrar la materia');
  }
};

/**
 * Servicio para obtener todas las materias del usuario autenticado
 * @param {string} userId - ID del usuario autenticado
 * @returns {Promise<Array>} - Lista de materias
 * @throws {Error} - Si ocurre un error al obtener las materias
 */
export const getUserSubjects = async userId => {
  try {
    return await Subjects.findAll({ where: { userId } });
  } catch (error) {
    console.error(`Error al obtener las materias para el usuario con id: ${userId}. Su error es: ${error.message}`);

    throw new Error('Error al obtener las materias');
  }
};

/**
 * Servicio para crear una nueva materia para el usuario autenticado
 * @param {string} userId - ID del usuario autenticado
 * @param {Object} subjectData - Datos de la materia
 * @returns {Promise<Object>} - Materia creada
 * @throws {Error} - Si ocurre un error al crear la materia
 */
export const createSubject = async (userId, { subjectName, description, name_teacher }) => {
  try {
    return await Subjects.create({
      name: subjectName,
      description,
      name_teacher,
      userId,
    });
  } catch (error) {
    console.error(`Error al crear la materia para el usuario con id: ${userId}. Su error es: ${error.message}`);

    throw new Error('Error al crear la materia');
  }
};

/**
 * Servicio para editar una materia del usuario autenticado
 * @param {string} userId - ID del usuario autenticado
 * @param {string} subjectId - ID de la materia a editar
 * @param {Object} subjectData - Datos actualizados de la materia
 * @returns {Promise<Object>} - Materia actualizada
 * @throws {Error} - Si ocurre un error al editar la materia
 */
export const updateSubject = async (userId, subjectId, { subjectName, description, name_teacher }) => {
  try {
    const subject = await findSubjectByIdAndUserId(subjectId, userId);

    Object.assign(subject, { name: subjectName, description, name_teacher });
    await subject.save();

    return subject;
  } catch (error) {
    console.error(`Error al editar la materia con id: ${subjectId}. Su error es: ${error.message}`);

    throw new Error('Error al editar la materia');
  }
};

/**
 * Servicio para eliminar una materia del usuario autenticado
 * @param {string} userId - ID del usuario autenticado
 * @param {string} subjectId - ID de la materia a eliminar
 * @returns {Promise<void>}
 * @throws {Error} - Si ocurre un error al eliminar la materia
 */
export const deleteSubject = async (userId, subjectId) => {
  try {
    const subject = await findSubjectByIdAndUserId(subjectId, userId);

    await subject.destroy();
  } catch (error) {
    console.error(`Error al eliminar la materia con id: ${subjectId}. Su error es: ${error.message}`);

    throw new Error('Error al eliminar la materia');
  }
};
