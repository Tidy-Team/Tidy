import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./env.js";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT,
  logging: false, //Desactiva el filtro de consultas SQL. Aumenta el rendimiento de la aplicación.
});

// Verifica si la conexión se realiza con éxito o no
const testConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("La conexión se estableció correctamente");
  } catch (error) {
    console.error(`No se pudo establecer la conexión correctamente: ${error}`);
  }
};

testConnect();
