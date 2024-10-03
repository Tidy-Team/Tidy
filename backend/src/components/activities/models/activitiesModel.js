import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databases.js';

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
      type: DataTypes.TEXT,
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'en_progreso', 'completada'),
      defaultValue: 'pendiente',
    },
    option: {
      type: DataTypes.ENUM('Option 1', 'Option 2'),
      defaultValue: 'Option 1',
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
