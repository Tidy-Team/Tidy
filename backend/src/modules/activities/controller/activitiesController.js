import {
  findActivityById,
  updateActivity,
  deleteActivity,
  findActivitiesBySubjectId,
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
  createActivityWithSubtasks,
} from '../services/activitiesService.js';
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js';
import logger from '../../logger/config.js';
=======
} from '../services/activitiesService.js'
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js'
import logger from '../../logger/config.js'
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

export const getActivities = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
    logger.info(`Buscando actividad de la materia con id: ${id} para el usuario con id: ${userId}`);
    const subject = await findSubjectByIdAndUserId(id, userId);
=======
    logger.info(
      `Buscando actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const subject = await findSubjectByIdAndUserId(userId, id)
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

    logger.info(`Materia encontrada: ${JSON.stringify(subject)}`)

    const activities = await findActivitiesBySubjectId(subject.id)
    res.status(200).json(activities)
    logger.info(`Actividades encontradas para la materia con id: ${id}`)
  } catch (error) {
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
    logger.error(`Error al obtener las actividades para la materia con id: ${id}. Su error es: ${error.stack}`);

=======
    logger.error(
      `Error al obtener las actividades para la materia con id: ${id}. Su error es: ${error.stack}`
    )
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js
    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontraron actividades'
          : 'Error en el servidor al obtener las actividades. Por favor, intentalo de nuevo.',
    })
  }
}

export const getActivitiesById = async (req, res) => {
  const { id, idActivity } = req.params;
  const userId = req.user.id;

  logger.info(`El id de la actividad: ${idActivity} de la materia con id: ${id}`);

  try {
    logger.info(`Buscando actividad con id: ${idActivity} de la materia con id: ${id} para el usuario con id: ${userId}`);
    const subject = await findSubjectByIdAndUserId(id, userId);

    if (!subject) {
      return res.status(404).json({ message: 'No se encontró la materia para la actividad' });
    }

    const activity = await findActivityById(idActivity);

    if (!activity || activity.subject_id !== subject.id) {
      return res.status(404).json({ message: 'No se encontró la actividad para la materia' });
    }

    res.status(200).json({ Materia: subject.id, Actividad: activity });

    logger.info(`Actividad encontrada con id: ${idActivity} para la materia con id: ${id}`);
  } catch (error) {
    logger.error(
      `Error al obtener la actividad con id: ${idActivity} para la materia con id: ${id}. Su error es: ${error.stack}`
    );

    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontró la actividad'
          : 'Error en el servidor al obtener la actividad. Por favor, intentalo de nuevo.',
    });
  }
};

export const createActivityCtrl = async (req, res) => {
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
  const { id } = req.params;
  const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id, option } = req.body;
  const userId = req.user.id;

  logger.info(`Esta es la opcion: ${option}`);
=======
  const { id } = req.params
  const userId = req.user.id
  const activityData = req.body
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

  try {
    logger.info(
      `Solicitud para crear una nueva actividad para la materia con id: ${id} y el usuario con id: ${userId}`
    )
    const subject = await findSubjectByIdAndUserId(userId, id)

<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
    const newActivity = await createActivityWithSubtasks(
      {
        titulo,
        description,
        fecha_inicio,
        fecha_fin,
        estado,
        num_preguntas,
        prioridad_id,
        option,
        user_id: userId,
        subject_id: subject.id,
      },
      option
    );
=======
    const newActivity = await createActivity({
      ...activityData,
      user_id: userId,
      subject_id: subject.id,
    })
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

    logger.info(
      `Actividad creada para la materia con id: ${id} y el usuario con id: ${userId}`
    )

    return res.status(201).json({
      message: 'Actividad creada exitosamente',
      activity: newActivity,
    })
  } catch (error) {
    logger.error(
      `Error al crear la actividad para la materia con id: ${id} y el usuario con id: ${userId}. Su error es: ${error.stack}`
    )

    return res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontró la materia para la actividad'
          : 'Error en el servidor al actualizar la actividad. Por favor, intentalo de nuevo.',
    })
  }
}

export const updateActivityCtrl = async (req, res) => {
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
  const { id } = req.params;
  const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id, option } = req.body;
  const userId = req.user.id;
=======
  const { id } = req.params
  const userId = req.user.id
  const activityData = req.body
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

  try {
    logger.info(
      `Solicitud para actualizar la actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const activity = await findActivityById(id)
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId)

<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
    const updatedActivity = await updateActivity(
      id,
      {
        titulo,
        description,
        fecha_inicio,
        fecha_fin,
        estado,
        num_preguntas,
        prioridad_id,
        option,
        user_id: userId,
        subject_id: subject.id,
      },
      option
    );
=======
    const updatedActivity = await updateActivity(id, {
      ...activityData,
      user_id: userId,
      subject_id: subject.id,
    })
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

    res.status(200).json({
      message: 'Actividad actualizada exitosamente',
      activity: updatedActivity,
    })

    logger.info(
      `Actividad con id: ${id} actualizada para el usuario con id: ${userId}`
    )
  } catch (error) {
    logger.error(
      `Error al actualizar la actividad con id: ${id} para el usuario con id: ${userId}. Su error es: ${error.stack}`
    )
    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontró la actividad'
          : 'Error en el servidor al actualizar la actividad. Por favor, intentalo de nuevo.',
    })
  }
}

export const deleteActivityCtrl = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
<<<<<<< HEAD:backend/src/modules/activities/controller/activitiesController.js
    logger.info(`Solicitud para eliminar la actividad con id: ${id} para el usuario con id: ${userId}`);
    const activity = await findActivityById(id);
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId);

    if (!subject) {
      return res.status(404).json({ message: 'No se encontró la materia para la actividad' });
    }

    await deleteActivity(id);
=======
    logger.info(
      `Solicitud para eliminar la actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const activity = await findActivityById(id)
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId)
    await deleteActivity(id)
>>>>>>> dev_cuellaMateo:backend/src/components/activities/controller/activitiesController.js

    res.status(200).json({
      message: 'Actividad eliminada exitosamente',
      activity: activity,
    })

    logger.info(
      `Actividad con id: ${id} eliminada para el usuario con id: ${userId}`
    )
  } catch (error) {
    logger.error(
      `Error al eliminar la actividad con id: ${id} para el usuario con id: ${userId}. Su error es: ${error.stack}`
    )
    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontró la actividad'
          : 'Error en el servidor al eliminar la actividad. Por favor, intentalo de nuevo.',
    })
  }
}
