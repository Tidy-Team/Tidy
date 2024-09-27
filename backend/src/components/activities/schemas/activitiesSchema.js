import { z } from 'zod';
import { parseISO, formatISO } from 'date-fns';
import moment from 'moment-timezone';

const timeZone = 'America/Argentina/Buenos_Aires';

export const activitiesSchema = z.object({
  titulo: z.string().min(1, 'Debe tener título').max(100, 'El titulo debe tener menos de 100 caracteres'),
  description: z.string().optional(),
  fecha_inicio: z
    .string()
    .optional()
    .default(() => formatISO(new Date()))
    .refine(date => {
      if (!date) {
        console.error('fecha_inicio es undefined o null');
        return false;
      }
      const parsedDate = parseISO(date);
      if (isNaN(parsedDate)) {
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
      if (!date) {
        console.error('fecha_fin es undefined o null');
        return false;
      }
      const parsedDate = parseISO(date);
      if (isNaN(parsedDate)) {
        console.error(`fecha_fin no es una fecha válida: ${date}`);
        return false;
      }
      const zonedDate = moment.tz(parsedDate, timeZone).toDate();
      return zonedDate >= new Date();
    }, 'La fecha de fin no puede ser en el pasado'),
  estado: z.enum(['pendiente', 'en progreso', 'completada']).default('pendiente'),
  user_id: z.number().int().positive(),
  prioridad_id: z.number().int().positive(),
  num_preguntas: z.number().int().positive().min(1, 'Debe haber al menos una pregunta'),
});
