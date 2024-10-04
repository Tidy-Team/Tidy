import { Subtasks } from '../models/subtasksModel.js';
import { Activities } from '../models/activitiesModel.js';
import { sequelize } from '../../../config/databases.js';

const OPTION_1 = 'Option 1';
const OPTION_2 = 'Option 2';

/**
 * Genera subtareas basadas en la opción proporcionada.
 * @param {Object} activityData - Datos de la actividad.
 * @param {number} activityId - ID de la actividad.
 * @param {string} option - Opción para generar subtareas.
 * @returns {Array<Object>} - Lista de subtareas generadas.
 * @throws {Error} - Si la opción no es válida.
 */

export const generateSubtasks = (activityData, activityId, option) => {
  const subtasks = [];
  let numSubtasks = 0;

  switch (option) {
    case OPTION_1:
      numSubtasks = Math.ceil(activityData.num_preguntas / 2);
      break;
    case OPTION_2:
      numSubtasks = activityData.num_preguntas * 2;
      break;
    default:
      throw new Error('Opción no válida');
  }

  for (let i = 0; i < numSubtasks; i++) {
    subtasks.push(createSubtask(activityData, activityId, i));
  }

  return subtasks;
};

/**
 * Crea una subtarea.
 * @param {Object} activityData - Datos de la actividad.
 * @param {number} activityId - ID de la actividad.
 * @param {number} index - Índice de la subtarea.
 * @returns {Object} - Subtarea creada.
 */
export const createSubtask = (activityData, activityId, index) => {
  return {
    titulo: `${activityData.titulo} - Subtarea ${index + 1}`,
    description: activityData.description,
    estado: activityData.estado,
    actividad_id: activityId,
  };
};
