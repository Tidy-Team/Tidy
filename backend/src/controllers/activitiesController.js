import { sequelize } from '../config/databases.js';
import { Activities } from '../components/activities/models/activitiesModel.js';
import { Subjects } from '../components/subjects/models/subjectModel.js';

//Controlador para obtener todas las actividades de una materia
export const getActivities = async (req, res) => {
  const { id } = req.params; //Obtenemos el id de la materia
  const userId = req.userId;

  try {
    const subject = await Subjects.findOne({ where: { id, userId } });

    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    const activities = await Activities.findAll({ where: { subjectsId: id } });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las actividades' });
  }
};

//Controlador para crear una actividad en una materia
export const createActivities = async (req, res) => {
  const { titulo, description, fecha_inicio, fecha_fin, estado } = req.body;
  const { id } = req.params; //Obtenemos el id de la materia
  const userId = req.userId;

  try {
    const subject = await Subjects.findOne({ where: { id: id, userId } });

    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    const newActivity = await Activities.create({
      titulo,
      description,
      fecha_inicio,
      fecha_fin,
      estado,
      subjectsId: id,
    });
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la actividad' });
  }
};

//editar una actividad de una materia
export const updateSubject = async (req, res) => {
  const { titulo, description, fecha_inicio, fecha_fin, estado } = req.body;
  const { id } = req.params; //Obtenemos el id de la actividad a editar
  const userId = req.userId;

  try {
    const activity = await Activities.findOne({ where: { id, userId } });

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    activity.titulo = titulo || activity.titulo;
    activity.description = description || activity.description;
    activity.fecha_inicio = fecha_inicio || activity.fecha_inicio;
    activity.fecha_fin = fecha_fin || activity.fecha_fin;
    activity.estado = estado || activity.estado;
    await activity.save();

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar la actividad' });
  }
};

//Eliminar una actividad de una materia
export const deleteSubject = async (req, res) => {
  const { id } = req.params; //Obtenemos el id de la actividad a eliminar
  const userId = req.userId;

  try {
    const activity = await Activities.findOne({ where: { id, userId } });

    if (!activity) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }

    await activity.destroy();
    res.status(200).json({ message: 'Actividad eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la actividad' });
  }
};
