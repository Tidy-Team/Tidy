import { Sequelize } from "sequelize";
import { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } from "./env";

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
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
