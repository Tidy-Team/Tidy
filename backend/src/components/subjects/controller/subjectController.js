import { createSubject, deleteSubject, updateSubject, getUserSubjects } from '../services/subjectsService.js';
import logger from '../../logger/config.js';

export const getUserSubjectsCtrl = async (req, res) => {
  const userId = req.user.id;

  try {
    logger.info(`Solicitud para obtener todas las materias para el usuario con id: ${userId}`);
    const subjects = await getUserSubjects(userId);

    res.status(200).json(subjects);
    logger.info(`Materias encontradas para el usuario con id: ${userId}`);
  } catch (error) {
    logger.error(
      `Error en el controlador al obtener todas las materias para el usuario con id: ${userId}. Su error es: ${error.stack}`
    );

    res.status(error.statusCode || 500).json({
      message:
        error.statusCode === 404
          ? 'No se encontraron materias'
          : 'Error en el servidor al obtener las materias. Por favor, intentalo de nuevo.',
    });
  }
};

export const createSubjectCtrl = async (req, res) => {
  const { subjectName, description, name_teacher } = req.body;
  const userId = req.user.id;

  try {
    logger.info(`Solicitud para crear una nueva materia para el usuario con id: ${userId}`);
    const newSubject = await createSubject(userId, { subjectName, description, name_teacher });

    res.status(201).json({
      message: 'Materia creada exitosamente',
      subject: newSubject,
    });

    logger.info(`Materia creada para el usuario con id: ${userId}`);
  } catch (error) {
    logger.error(`Error en el controlador al crear la materia para el usuario con id: ${userId}. Su error es: ${error.stack}`);

    res.status(error.statusCode || 500).json({
      message: 'Error en el servidor al crear la materia. Por favor, intentalo de nuevo.',
    });
  }
};

export const updateSubjectCtrl = async (req, res) => {
  const { subjectId } = req.params;
  const { subjectName, description, name_teacher } = req.body;
  const userId = req.user.id;

  try {
    logger.info(`Solicitud para editar la materia con id: ${subjectId} para el usuario con id: ${userId}`);
    const updatedSubject = await updateSubject(userId, subjectId, { subjectName, description, name_teacher });

    res.status(200).json({ message: 'Materia actualizada exitosamente', subject: updatedSubject });

    logger.info(`Materia con id: ${subjectId} actualizada para el usuario con id: ${userId}`);
  } catch (error) {
    logger.error(
      `Error en el controlador al actualizar la materia para el usuario con id: ${userId}. Su error es: ${error.stack}`
    );

    res.status(error.statusCode || 500).json({
      message: 'Error en el servidor al actualizar la materia. Por favor, intentalo de nuevo.',
    });
  }
};

export const deleteSubjectCtrl = async (req, res) => {
  const { subjectId } = req.params;
  const userId = req.user.id;

  try {
    logger.info(`Solicitud para eliminar la materia con id: ${subjectId} para el usuario con id: ${userId}`);
    const deletedSubject = await deleteSubject(userId, subjectId);

    res.status(200).json({ message: 'Materia eliminada exitosamente', subject: deletedSubject });

    logger.info(`Materia con id: ${subjectId} eliminada para el usuario con id: ${userId}`);
  } catch (error) {
    logger.error(`Error en el controlador al eliminar la materia con id: ${subjectId}. Su error es: ${error.stack}`);

    res.status(error.statusCode || 500).json({
      message: 'Error en el servidor al eliminar la materia. Por favor, intentalo de nuevo.',
    });
  }
};
