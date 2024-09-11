import { Activities } from "../components/activities/models/activitiesModel.js";
import { Priorities } from "../components/priorities/models/prioritiesModel.js";
import { User } from "../components/users/models/userModel.js";

// Relación entre Prioridades y Actividades: De uno a muchos.
Priorities.hasMany(Activities, { foreignKey: "prioridad_id" });
Activities.belongsTo(Priorities, { foreignKey: "prioridad_id" });
//Relación entre User y Activities: De uno a muchos.
User.hasMany(Activities, { foreignKey: "user_id" });
Activities.belongsTo(User, { foreignKey: "user_id" });
