import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/databases.js';

//Modelo de Prioridades con: id, name, email, password, rol y fecha de registro.
export const Users = sequelize.define(
  'users',
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('estudiante', 'tutor', 'padre'),
      defaultValue: 'estudiante',
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'users',
    timestamps: false, //Saca createAt y updateAt
  }
);
