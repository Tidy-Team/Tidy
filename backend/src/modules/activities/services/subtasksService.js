import { where } from 'sequelize';
import createError from '../../../helpers/createError.js';
import { Subtasks } from '../models/subtasksModel.js';

const OPTION_1 = 'Option 1';
const OPTION_2 = 'Option 2';

export const createSubtasks = (activityData, activityId, index) => {
  return {
    titulo: `${activityData.titulo} - Subtarea ${index + 1}`,
    description: `${activityData.description}`,
    estado: `${activityData.estado}`,
    actividad_id: activityId,
  };
};

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
      createError('Opción no válida', 400);
  }

  for (let i = 0; i < numSubtasks; i++) {
    subtasks.push(createSubtasks(activityData, activityId, i));
  }

  return subtasks;
};

export const findSubtasksById = async subtasksId => {
  try {
    logger.info(`Buscando subtarea con id: ${subtasksId}`);
    const subtask = await Subtasks.findOne({ where: { id: subtasksId } });

    if (!subtask) {
      logger.info(`La subtarea con id: ${subtasksId} no se encontro`);
      throw createError('Subtarea no encontrada', 404);
    }

    return subtask;
  } catch (error) {
    logger.error(`Error al buscar la subtarea con id: ${subtasksId}`);

    throw createError('Error en el servidor al buscar la subtarea', error.statusCode || 500);
  }
};
