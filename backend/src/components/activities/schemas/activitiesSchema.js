import { z } from 'zod';
import moment from 'moment-timezone';

const timeZone = 'America/Argentina/Buenos_Aires';

export const activitiesSchema = z.object({
  titulo: z.string().min(1, 'Debe tener título').max(100, 'El titulo debe tener menos de 100 caracteres'),
  description: z.string().optional(),
  fecha_inicio: z
    .string()
    .optional()
    .default(() => moment().tz(timeZone).format()) // Establece la fecha actual en la zona horaria de Buenos Aires
    .refine(date => {
      const parsedDate = moment(date);
      if (!parsedDate.isValid()) {
        console.error(`fecha_inicio no es una fecha válida: ${date}`);
        return false;
      }
      const zonedDate = moment.tz(parsedDate, timeZone).toDate();
      return zonedDate <= new Date();
    }, 'No te pueden dar una tarea futura'),
  fecha_fin: z
    .string()
    .optional()
    .refine(date => {
      const parsedDate = moment(date);
      if (!parsedDate.isValid()) {
        console.error(`fecha_fin no es una fecha válida: ${date}`);
        return false;
      }
      const zonedDate = moment.tz(parsedDate, timeZone).toDate();
      return zonedDate >= new Date();
    }, 'La fecha de fin no puede ser en el pasado'),
  estado: z.enum(['pendiente', 'en progreso', 'completada']).default('pendiente'),
  prioridad_id: z.number().int().positive(),
  num_preguntas: z.number().int().positive().min(1, 'Debe haber al menos una pregunta'),
});
