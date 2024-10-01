import { sequelize } from './databases.js';
import { Users } from '../components/users/models/userModel.js';
import { Activities } from '../components/activities/models/activitiesModel.js';
import { Priorities } from '../components/priorities/models/prioritiesModel.js';
import { Subjects } from '../components/subjects/models/subjectModel.js';
import './relationships.js'; // Importar el archivo de relaciones
import bcrypt from 'bcryptjs';

const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); //No se usa force:true para no tener perdidas de datos. Pero se puede usar en desarrollo

    // Insertar datos iniciales
    await Priorities.bulkCreate([{ nivel: 'baja' }, { nivel: 'media' }, { nivel: 'alta' }]);

    // Inserto un usuario inicial
    const hashedPassword = await bcrypt.hash('123Admin', 10);
    await Users.findOrCreate({
      where: { email: 'admin@admin.com' },
      defaults: {
        name: 'Admin',
        password: hashedPassword,
        rol: 'padre',
        emailVerified: true,
      },
    });

    console.log('Todos los modelos se sincronizaron correctamente');
  } catch (error) {
    console.error(`Ocurrió un error al sincronizar los modelos: ${error}`);
  }
};

syncModels();
