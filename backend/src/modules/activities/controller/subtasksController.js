import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js';
import { findActivityById } from '../services/activitiesService.js';
import { findSubtasksById } from '../services/subtasksService.js';

import logger from '../../logger/config.js';

export const subtasksByIdCtrl = async (req, res) => {
  const { idSubject, idActivity, idSubtask } = req.params;
  const userId = req.user.id;

  try {
    logger.info(`Buscando la materia con id: ${idSubject}`);
    const isSubject = await findSubjectByIdAndUserId(idSubject, userId);

    if (!isSubject) {
      logger.error(`No se encontró la materia con id: ${idSubject}`);
      return res.status(404).json({ message: 'Error al encontrar la materia' });
    }

    const isActivity = await findActivityById(idActivity);
    if (!isActivity || isActivity.subject_id !== isSubject.id) {
      logger.error(`No se encontró la actividad con id: ${idActivity} o no pertenece a la materia con id: ${idSubject}`);
      return res.status(404).json({ message: 'Error al encontrar la actividad' });
    }

    logger.info(`Buscando la subtarea con id: ${idSubtask}`);
    const isSubtask = await findSubtasksById(idSubtask);

    if (!isSubtask || isSubtask.actividad_id !== isActivity.id) {
      logger.error(`No se encontró la subtarea con id: ${idSubtask} o no pertenece a la actividad con id: ${idActivity}`);
      return res.status(404).json({ message: 'Error al encontrar la subtarea' });
    }

    return res.status(200).json({ Materia: isSubject.subjectName, Actividad: isActivity.titulo, Subtarea: isSubtask });
  } catch (error) {
    logger.error(
      `Error al obtener la subtarea con id: ${idSubtask} para la materia con id: ${idSubject} con la actividad con id: ${idActivity}. Su error es: ${error.stack}`
    );

    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404 ? error.message : 'Error en el servidor al obtener la subtarea. Por favor, intentalo de nuevo.',
    });
  }
};
