import { sequelize } from "./databases.js";

const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log("Todos los modelos se sincronizaron correctamente");
  } catch (error) {
    console.error(`Ocurrió un error al sincronizar los modelos: ${error}`);
  }
};

syncModels();
