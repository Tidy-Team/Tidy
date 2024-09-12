import { sequelize } from './databases.js';
import { Users } from '../components/users/models/userModel.js';
import { Activities } from '../components/activities/models/activitiesModel.js';
import { Priorities } from '../components/priorities/models/prioritiesModel.js';
import { Subjects } from '../components/subjects/models/subjectModel.js';
import './relationships.js'; // Importar el archivo de relaciones

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true }); //No se usa force:true para no tener perdidas de datos. Pero se puede usar en desarrollo
    console.log('Todos los modelos se sincronizaron correctamente');
  } catch (error) {
    console.error(`Ocurrió un error al sincronizar los modelos: ${error}`);
  }
};

syncModels();
