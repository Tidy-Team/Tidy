import { Subjects } from '../components/subjects/models/subjectModel';

//Obtener todas las materias del usuario autenticado
export const getUserSubjects = async (req, res) => {
  const userId = req.userId; //Obtenemos el id del usuario autenticado

  try {
    const subjects = await Subjects.findAll({
      where: { userId },
    });
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las materias' });
  }
};

//Crear un nueva materia para el usuario autenticado
export const createSubject = async (req, res) => {
  const { name, description, name_teacher } = req.body;
  const userId = req.userId;

  try {
    const newSubject = await Subjects.create({
      name,
      description,
      name_teacher,
      userId,
    });
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la materia' });
  }
};

//Editar una materia del usuario autenticado
export const updateSubject = async (req, res) => {
  const { name, description, name_teacher } = req.body;
  const { id } = req.params; //Obtenemos el id de la materia a editar
  const userId = req.userId;

  try {
    const subject = await Subjects.findOne({ where: { id, userId } });

    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    subject.name = name || subject.name;
    subject.description = description || subject.description;
    await subject.save();

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar la materia' });
  }
};

//Eliminar una materia del usuario autenticado
export const deleteSubject = async (req, res) => {
  const { id } = req.params; //Obtenemos el id de la materia a eliminar
  const userId = req.userId;

  try {
    const subject = await Subjects.findOne({ where: { id, userId } });

    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada' });
    }

    await subject.destroy();
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la materia' });
  }
};
