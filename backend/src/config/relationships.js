import { Activities } from '../components/activities/models/activitiesModel.js';
import { Priorities } from '../components/priorities/models/prioritiesModel.js';
import { Subjects } from '../components/subjects/models/subjectModel.js';
import { Users } from '../components/users/models/userModel.js';

// Relación entre Prioridades y Actividades: De uno a muchos.
Priorities.hasMany(Activities, { foreignKey: 'prioridad_id' });
Activities.belongsTo(Priorities, { foreignKey: 'prioridad_id' });

//Relación entre User y Activities: De uno a muchos.
Users.hasMany(Activities, { foreignKey: 'user_id' });
Activities.belongsTo(Users, { foreignKey: 'user_id' });

//Relación entre Materias y Actividades
Subjects.hasMany(Activities, { foreignKey: 'subject_id' });
Activities.belongsTo(Subjects, { foreignKey: 'subject_id' });
