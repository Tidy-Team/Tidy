import { Activities } from '../models/activitiesModel.js';
import logger from '../../logger/config.js';
import createError from '../../../helpers/createError.js';

/**
 * Busca una actividad por su ID.
 * @param {number} activityId - ID de la actividad.
 * @returns {Promise<Object>} - Actividad encontrada.
 * @throws {Error} - Si la actividad no es encontrada.
 */
export const findActivityById = async activityId => {
  try {
    logger.info(`Buscando la actividad con id: ${activityId}`);
    const activity = await Activities.findOne({ where: { id: activityId } });

    if (!activity) {
      logger.info(`La actividad con id: ${activityId} no se encontró`);
      throw createError('Actividad no encontrada', 404);
    }

    return activity;
  } catch (error) {
    logger.error(`Error al buscar la actividad con id ${activityId}. Su error es: ${error.message}`);
    throw createError('Error al encontrar la actividad', error.statusCode || 500);
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
    logger.info(`Buscando actividades para la materia con id: ${subjectId}`);

    const activities = await Activities.findAll({
      where: { subject_id: subjectId },
    });

    if (!activities || activities.length === 0) {
      logger.info(`No se encontraron actividades para la materia con id: ${subjectId}`);
      throw createError('No se encontraron actividades', 404);
    }

    return activities;
  } catch (error) {
    logger.error(`Error al buscar actividades para la materia con id: ${subjectId}. Su error es: ${error.message}`);
    throw createError('Error al buscar actividades', error.statusCode || 500);
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
    logger.info('Creando una nueva actividad');
    const newActivity = await Activities.create({ ...activityData });

    return newActivity;
  } catch (error) {
    logger.error(`Ocurrió un error al crear la actividad: ${error.message}`);
    throw createError('Error al crear la actividad', error.statusCode || 500);
  }
};

/**
 * Actualiza una actividad existente.
 * @param {number} activityId - ID de la actividad.
 * @param {Object} activityData - Datos a actualizar.
 * @returns {Promise<Object>} - Actividad actualizada.
 * @throws {Error} - Si ocurre un error al actualizar la actividad.
 */
export const updateActivity = async (activityId, activityData) => {
  try {
    logger.info(`Actualizando actividad con id: ${activityId}`);
    const activity = await findActivityById(activityId);

    if (!activity) {
      logger.info(`La actividad con id: ${activityId} no se encontró`);
      throw createError('Actividad no encontrada', 404);
    }

    Object.assign(activity, activityData);
    await activity.save();

    return activity;
  } catch (error) {
    logger.error(`Error al actualizar actividad con id: ${activityId}. Su error es: ${error.message}`);
    throw createError('Error al actualizar la actividad', error.statusCode || 500);
  }
};

/**
 * Servicio para eliminar una actividad.
 * @param {string} activityId - ID de la actividad.
 * @returns {Promise<void>}
 * @throws {Error} - Si ocurre un error al eliminar la actividad.
 */
export const deleteActivity = async activityId => {
  try {
    logger.info(`Eliminando actividad con id: ${activityId}`);
    const activity = await findActivityById(activityId);

    if (!activity) {
      logger.info(`La actividad con id: ${activityId} no se encontró`);
      throw createError('Actividad no encontrada', 404);
    }

    await activity.destroy();
  } catch (error) {
    logger.error(`Error al eliminar actividad con id: ${activityId}. Su error es: ${error.message}`);
    throw createError('Error al eliminar la actividad', error.statusCode || 500);
  }
};
