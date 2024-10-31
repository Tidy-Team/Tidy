import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js';
import { findActivityById } from '../services/activitiesService.js';
import { deleteSubtasks, findSubtasksById } from '../services/subtasksService.js';

import logger from '../../logger/config.js';

export const getSubtasks = async (req, res) => {
  const { idActivity } = req.params;
};

export const subtasksByIdCtrl = async (req, res) => {
  const { idSubject, idActivity, idSubtask } = req.params;
  const userId = req.user.id;

  try {
    logger.info(`Buscando la materia con id: ${idSubject}`);
    const isSubject = await findSubjectByIdAndUserId(idSubject, userId);

    if (!isSubject) {
      logger.error(`No se encontró la materia con id: ${idSubject}`);
      return res.status(404).json({ message: 'No se encontro la materia' });
    }

    const isActivity = await findActivityById(idActivity);
    if (!isActivity || isActivity.subject_id !== isSubject.id) {
      logger.error(`No se encontró la actividad con id: ${idActivity} o no pertenece a la materia con id: ${idSubject}`);
      return res.status(404).json({ message: 'No se encontro la actividad o no pertenece a la materia' });
    }

    logger.info(`Buscando la subtarea con id: ${idSubtask}`);
    const isSubtask = await findSubtasksById(idSubtask);

    if (!isSubtask || isSubtask.actividad_id !== isActivity.id) {
      logger.error(`No se encontró la subtarea con id: ${idSubtask} o no pertenece a la actividad con id: ${idActivity}`);
      return res.status(404).json({ message: 'No se encontro la subtarea o no pertenece a la actividad' });
    }

    return res.status(200).json({ Materia: isSubject.subjectName, Actividad: isActivity.titulo, Subtarea: isSubtask });
  } catch (error) {
    logger.error(
      `Error al obtener la subtarea con id: ${idSubtask} para la materia con id: ${idSubject} con la actividad con id: ${idActivity}. Su error es: ${error.stack}`
    );

    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'Subtarea no encontrada'
          : 'Error en el servidor al obtener la subtarea. Por favor, intentalo de nuevo.',
    });
  }
};

export const updateSubtasksCtrl = async (req, res) => {
  const { idActivity, idSubtask } = req.params;
  const { estado } = req.body;

  try {
    logger.info(`Buscando la actividad con id: ${idActivity}`);
    const isActivity = await findActivityById(idActivity);

    if (!isActivity) {
      logger.error(`No se encontró la actividad con id: ${idActivity}`);
      return res.status(404).json({ message: 'No se encontró la actividad' });
    }

    logger.info(`Actualizando la subtarea con id: ${idSubtask}`);
    const isSubtask = await findSubtasksById(idSubtask);

    if (!isSubtask || isSubtask.actividad_id !== isActivity.id) {
      logger.error(`No se encontró la subtarea con id: ${idSubtask} o no pertenece a la actividad con id: ${idActivity}`);
      return res.status(404).json({ message: 'No se encontró la subtarea o no pertenece a la actividad' });
    }

    if (estado === 'completado') {
      logger.info(`Eliminando la subtarea con id: ${idSubtask} ya que está completada`);
      await deleteSubtasks(idSubtask);
      return res.status(200).json({ message: 'Subtarea completada y eliminada' });
    }

    logger.info(`Actualizando la subtarea con id: ${idSubtask} a estado: ${estado}`);
    await isSubtask.update({ estado });

    return res.status(200).json({ message: 'Subtarea actualizada' });
  } catch (error) {
    logger.error(`Error al actualizar la subtarea con id: ${idSubtask}. Su error es: ${error.stack}`);

    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'La subtarea no se encontro y no se pudo actualizar'
          : 'Error en el servidor al actualizar la subtarea. Por favor, intentalo de nuevo.',
    });
  }
};
