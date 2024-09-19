import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databases.js';
import { Users } from '../../users/models/userModel.js';

export const Subjects = sequelize.define(
  'subjects',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name_teacher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'subjects',
  }
);

//Relacion de Materias le pertenece a un Usuario
Subjects.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
