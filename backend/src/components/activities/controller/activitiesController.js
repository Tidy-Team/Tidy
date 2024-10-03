import {
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  findActivitiesBySubjectId,
} from '../services/activitiesService.js';
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService.js';
import { Subtasks } from '../models/subtasksModel.js';

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
    const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id, option } = req.body;
    const { id } = req.params;
    const userId = req.user.id;

    const subject = await findSubjectByIdAndUserId(id, userId);

    const newActivity = await createActivity({
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
    });

    if (option === 'Option 1') {
      for (let i = 0; i < num_preguntas; i += 2) {
        await Subtasks.create({
          titulo: `${titulo} - Subtarea ${i / 2 + 1}`,
          description,
          fecha_inicio,
          fecha_fin,
          estado,
          actividad_id: newActivity.id,
        });
      }
    }

    if (option === 'Option 2') {
      for (let i = 0; i < num_preguntas * 2; i++) {
        await Subtasks.create({
          titulo: `${titulo} - Subtarea ${i + 1}`,
          description,
          fecha_inicio,
          fecha_fin,
          estado,
          actividad_id: newActivity.id,
        });
      }
    }

    res.status(201).json(newActivity);
  } catch (error) {
    console.error(`Error al crear la actividad: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const updateActivityCtrl = async (req, res) => {
  try {
    const { titulo, description, fecha_inicio, fecha_fin, estado, num_preguntas, prioridad_id } = req.body;
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
    console.error(`Error al actualizar la actividad: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const deleteActivityCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const activity = await findActivityById(id);
    const subject = await findSubjectByIdAndUserId(activity.subject_id, userId);
    await deleteActivity(id);

    res.status(200).json({ message: 'Actividad eliminada', activity: activity });
  } catch (error) {
    console.error(`Error al eliminar la actividad: ${error}`);
    res.status(500).json({ message: error.message });
  }
};
