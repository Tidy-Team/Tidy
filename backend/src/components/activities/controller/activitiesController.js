import {
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  findActivitiesBySubjectId,
} from '../services/activitiesService.js'
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js'
import logger from '../../logger/config.js'

export const getActivities = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    logger.info(
      `Buscando actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const subject = await findSubjectByIdAndUserId(userId, id)

    logger.info(`Materia encontrada: ${JSON.stringify(subject)}`)

    const activities = await findActivitiesBySubjectId(subject.id)
    res.status(200).json(activities)
    logger.info(`Actividades encontradas para la materia con id: ${id}`)
  } catch (error) {
    logger.error(
      `Error al obtener las actividades para la materia con id: ${id}. Su error es: ${error.stack}`
    )
    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontraron actividades'
          : 'Error en el servidor al obtener las actividades. Por favor, intentalo de nuevo.',
    })
  }
}

export const createActivityCtrl = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  const activityData = req.body

  try {
    logger.info(
      `Solicitud para crear una nueva actividad para la materia con id: ${id} y el usuario con id: ${userId}`
    )
    const subject = await findSubjectByIdAndUserId(userId, id)

    const newActivity = await createActivity({
      ...activityData,
      user_id: userId,
      subject_id: subject.id,
    })

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
  const { id } = req.params
  const userId = req.user.id
  const activityData = req.body

  try {
    logger.info(
      `Solicitud para actualizar la actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const activity = await findActivityById(id)
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId)

    const updatedActivity = await updateActivity(id, {
      ...activityData,
      user_id: userId,
      subject_id: subject.id,
    })

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
    logger.info(
      `Solicitud para eliminar la actividad con id: ${id} para el usuario con id: ${userId}`
    )
    const activity = await findActivityById(id)
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId)
    await deleteActivity(id)

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
