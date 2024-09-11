import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/databases.js";
import { User } from "../../users/models/userModel.js";
import { Priorities } from "../../priorities/models/prioritiesModel.js";

//Modelo de Actividades con: id, titulo, descripción, fecha inicio, fecha fin y su estado
export const Activities = sequelize.define(
  "Activities",
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
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("pendiente", "en_progreso", "completada"),
      defaultValue: "pendiente",
    },
    //Foránea al User ID
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE", //Se elimina las actividades cuando el usuario es eliminado
      onDelete: "SET NULL",
    },
    // Foránea a la Prioridad
    prioridad_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Priorities",
        key: "id",
      },
      onUpdate: "CASCADE", //Se elimina las actividades cuando el usuario es eliminado
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "activities",
  }
);
