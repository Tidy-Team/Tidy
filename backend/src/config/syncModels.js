import { sequelize } from "./databases.js";
import { User } from "../components/users/models/userModel.js";
import { Activities } from "../components/activities/models/activitiesModel.js";
import { Priorities } from "../components/priorities/models/prioritiesModel.js";
import "./relationships.js"; // Importar el archivo de relaciones

const syncModels = async () => {
  try {
    //Se sincronizan los modelos en un orden. Por si hay un error de creacion.
    await User.sync({ force: true }); //Solo utilizar force:true en desarrollo
    await Priorities.sync({ force: true });
    await Activities.sync({ force: true });

    console.log("Todos los modelos se sincronizaron correctamente");
  } catch (error) {
    console.error(`Ocurrió un error al sincronizar los modelos: ${error}`);
  }
};

syncModels();
