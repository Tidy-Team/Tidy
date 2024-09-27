import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databases.js';
import { Subjects } from '../../subjects/models/subjectModel.js';

//Modelo de Actividades con: id, titulo, descripción, fecha inicio, fecha fin y su estado
export const Activities = sequelize.define(
  'activities',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      //No deberia estar en español¿?
      type: DataTypes.TEXT,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'),
      defaultValue: 'pendiente',
    },
    num_preguntas: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prioridad_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subject_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: 'activities' }
);
