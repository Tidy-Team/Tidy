import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/databases.js";

//Modelo de Prioridades con: id, nivel
export const Priorities = sequelize.define("Priority", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nivel: {
    type: DataTypes.ENUM("baja", "media", "alta"),
    defaultValue: "alta",
  },
});
