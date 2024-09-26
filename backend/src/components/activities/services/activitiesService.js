import { Activities } from '../models/activitiesModel.js';

/**
 * Busca una actividad por su ID.
 * @param {number} activityId - ID de la actividad.
 * @returns {Promise<Object>} - Actividad encontrada.
 * @throws {Error} - Si la actividad no es encontrada.
 */
export const findActivityById = async activityId => {
  try {
    // Se busca la actividad
    const activity = await Activities.findOne({ where: { id: activityId } });

    // Si no se encuentra la actividad
    if (!activity) {
      throw new Error('Actividad no encontrada');
    }

    return activity;
  } catch (error) {
    console.error(
      `Error al buscar la actividad con id ${activityId}. Su error es: ${error.message}`
    );

    //Lanza el error
    throw error;
  }
};

/**
 * Busca todas las actividades de una materia por su ID.
 * @param {number} subjectId - ID de la materia.
 * @returns {Promise<Array>} - Lista de actividades.
 * @throws {Error} - Si ocurre un error al buscar las actividades.
 */
export const findActivitiesBySubjectId = async subjectId => {
  try {
    //Listar las actividades
    return await Activities.findAll({
      where: { subjectsId: subjectId },
    });
  } catch (error) {
    console.error(
      `Error al buscar actividades para la materia con id: ${subjectId}. Su error es: ${error.message}`
    );

    //Lanza el error
    throw error;
  }
};

/**
 * Crea una nueva actividad.
 * @param {Object} activityData - Datos de la actividad.
 * @returns {Promise<Object>} - Actividad creada.
 * @throws {Error} - Si ocurre un error al crear la actividad.
 */
export const createActivity = async activityData => {
  try {
    return await Activities.create(activityData);
  } catch (error) {
    console.error(`Ocurrió un error al crear la actividad: ${error}`);

    //Lanza el error
    throw error;
  }
};

/**
 * Actualiza una actividad existente.
 * @param {number} activityId - ID de la actividad.
 * @param {Object} updateData - Datos a actualizar.
 * @returns {Promise<Object>} - Actividad actualizada.
 * @throws {Error} - Si ocurre un error al actualizar la actividad.
 */
export const updateActivity = async (activityId, updateData) => {
  try {
    const activity = await findActivityById(activityId);

    Object.assign(activity, updateData);
    await activity.save();

    return activity;
  } catch (error) {
    console.error(
      `Error al actualizar actividad con id: ${activityId}.Su error es: ${error.message} `
    );

    throw error;
  }
};

export const deleteActivity = async activityId => {
  try {
    const activity = await findActivityById(activityId);

    await activity.destroy();
  } catch (error) {
    console.error(
      `Error al eliminar actividad con id: ${activityId}. Su error es: ${error.message}`
    );

    throw error;
  }
};
