import { z } from 'zod';
import { parseISO, formatISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const timeZone = 'America/Argentina/Buenos_Aires';

export const activitiesSchema = z.object({
  titulo: z.string().min(1, 'Debe tener título').max(100, 'El titulo debe tener menos de 100 caracteres'),
  description: z.string().optional(),
  fecha_inicio: z
    .string()
    .optional()
    .default(() => formatISO(new Date()))
    .refine(date => {
      const zonedDate = utcToZonedTime(parseISO(date), timeZone);
      return zonedDate <= new Date();
    }, 'No te pueden dar una tarea futura'),
  fecha_fin: z
    .string()
    .optional()
    .refine(date => {
      const zonedDate = utcToZonedTime(parseISO(date), timeZone);
      return zonedDate >= new Date();
    }, 'La fecha de fin no puede ser en el pasado'),
  estado: z.enum(['pendiente', 'en progreso', 'completada']).default('pendiente'),
  user_id: z.number().int().positive(),
  prioridad_id: z.number().int().positive(),
  num_preguntas: z.number().int().positive().min(1, 'Debe haber al menos una pregunta'),
});
