import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/databases.js";
import { Activities } from "../../activities/models/activities.model.js";

export const User = sequelize.define(
  "User",
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
      type: DataTypes.ENUM("estudiante", "tutor", "padre"),
      defaultValue: "estudiante",
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "users", //Asi se llama en la base de datos
    timestamps: false, //Se desactivan createdAt y updateAt
  }
);

//Establece la relación con Actividades de uno a muchos
User.hasMany(Activities, { foreignKey: "user_id" });
