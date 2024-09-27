import {
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  findActivitiesBySubjectId,
} from '../services/activitiesService.js';
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js';
import { activitiesSchema } from '../schemas/activitiesSchema.js';
import { ZodError } from 'zod';

// Función auxiliar para manejar errores de validación
const handleValidationError = (res, error) => {
  return res.status(400).json({
    message: 'Error de validación',
    errors: error.errors,
  });
};

export const getActivities = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    console.log(`Buscando materia con id: ${id} para el usuario con id: ${userId}`);

    const subject = await findSubjectByIdAndUserId(id, userId);
    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    console.log(`Materia encontrada: ${JSON.stringify(subject)}`);

    const activities = await findActivitiesBySubjectId(subject.id);
    res.status(200).json(activities);
  } catch (error) {
    console.error(`Error al obtener las actividades: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const createActivities = async (req, res) => {
  try {
    const validatedData = activitiesSchema.parse(req.body);
    const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id } = validatedData;
    const { id } = req.params;
    const userId = req.user.id;
    const subject = await findSubjectByIdAndUserId(id, userId);

    console.log('Datos validados:', validatedData);
    console.log('ID de la materia:', id);
    console.log('ID del usuario:', userId);
    console.log('ID de la materia encontrada:', subject.id);

    const newActivity = await createActivity({
      titulo,
      description,
      fecha_inicio,
      fecha_fin,
      estado,
      num_preguntas,
      prioridad_id,
      user_id: userId,
      subject_id: subject.id,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(res, error);
    }
    console.error(`Error al crear la actividad: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const updateActivityCtrl = async (req, res) => {
  try {
    const validatedData = activitiesSchema.parse(req.body);
    const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id } = validatedData;
    const { id } = req.params;
    const userId = req.user.id;

    const activity = await findActivityById(id);
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId);

    const updatedActivity = await updateActivity(id, {
      titulo,
      description,
      fecha_inicio,
      fecha_fin,
      estado,
      num_preguntas,
      prioridad_id,
      user_id: userId,
      subject_id: subject.id,
    });

    res.status(200).json(updatedActivity);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(res, error);
    }
    console.error(`Error al actualizar la actividad: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const deleteActivityCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const activity = await findActivityById(id);
    const subject = await findSubjectByIdAndUserId(activity.subjectId, userId);
    await deleteActivity(id);

    res.status(200).json({ message: 'Actividad eliminada' });
  } catch (error) {
    console.error(`Error al eliminar la actividad: ${error}`);
    res.status(500).json({ message: error.message });
  }
};
