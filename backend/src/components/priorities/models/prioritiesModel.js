import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/databases.js";

export const Priorities = sequelize.define("Priority", {
  id: {
    types: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nivel: {
    type: DataTypes.ENUM("baja", "media", "alta"),
    defaultValue: "alta",
  },
});

//Se establece la relación con Actividades de uno a muchos
Priorities.hasMany(Activities, { foreignKey: "user_id" });
