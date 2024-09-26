import {
  findActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  findActivitiesBySubjectId,
} from '../services/activitiesService';
import { findSubjectByIdAndUserId } from '../../subjects/services/subjectsService';

export const getActivities = async (req, res) => {
  const { id } = req.params; //Obtenemos el id de la materia
  const userId = req.userId;

  try {
    const subject = await findSubjectByIdAndUserId(id, userId);
    const activities = await findActivitiesBySubjectId(id);

    res.status(200).json(activities);
  } catch (error) {
    console.error(`Error al obtener las actividades: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const createActivities = async (req, res) => {
  const { titulo, description, fecha_inicio, fecha_fin, estado } = req.body;
  const { id } = req.params;
  const { userId } = req.userId;

  try {
    const subject = await findSubjectByIdAndUserId(id, userId);
    const newActivity = await createActivity({
      titulo,
      description,
      fecha_inicio,
      fecha_fin,
      estado,
      subjectId: id,
    });

    res.status(201).json(newActivity);
  } catch (error) {
    console.error(`Error al crear la actividad: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const updateActivityCtrl = async (req, res) => {
  const { titulo, description, fecha_inicio, fecha_fin, estado } = req.body;
  const { id } = req.params;
  const { userId } = req.userId;

  try {
    const activity = await findActivityById(id);
    const subject = await findSubjectByIdAndUserId(activity.subjectsId, userId);
    const updatedActivity = await updateActivity(id, {
      titulo,
      description,
      fecha_inicio,
      fecha_fin,
      estado,
    });

    res.status(200).json(updatedActivity);
  } catch (error) {
    console.error(`Error al editar la actividad: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const deleteActivityCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    try {
      const activity = await findActivityById(id);
      const subject = await findSubjectByIdAndUserId(
        activity.subjectId,
        userId
      );
      await deleteActivity(id);

      res.status(200).json({ message: 'Actividad eliminada' });
    } catch (error) {
      console.error(`Error al eliminar la actividad: ${error}`);

      res.status(500).json({ message: error.message });
    }
  } catch (error) {}
};
