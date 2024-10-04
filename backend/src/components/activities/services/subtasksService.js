import { Subtasks } from '../models/subtasksModel.js';
import { Activities } from '../models/activitiesModel.js';
import { sequelize } from '../../../config/databases.js';

const OPTION_1 = 'Option 1';
const OPTION_2 = 'Option 2';

export const createActivityWithSubtasks = async (activityData, option) => {
  const transaction = await sequelize.transaction();
  try {
    // Validamos los datos de entrada
    if (!activityData || !option) {
      throw new Error('Datos de actividad no válidos');
    }

    const newActivity = await Activities.create(activityData, { transaction });
    const subtasks = generateSubtasks(activityData, newActivity.id, option);

    if (subtasks.length > 0) {
      await Subtasks.bulkCreate(subtasks, { transaction });
    }

    await transaction.commit();
    return newActivity;
  } catch (error) {
    await transaction.rollback();

    console.error(`Error al crear la actividad con subtareas: ${error}`);
    throw error;
  }
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
      throw new Error('Opción no válida');
  }

  for (let i = 0; i < numSubtasks; i++) {
    subtasks.push(createSubtask(activityData, activityId, i));
  }

  return subtasks;
};

export const createSubtask = (activityData, activityId, index) => {
  return {
    titulo: `${activityData.titulo} - Subtarea ${index + 1}`,
    description: activityData.description,
    estado: activityData.estado,
    actividad_id: activityId,
  };
};
