import { z } from 'zod';

const subjectSchema = z.object({
  name: z
    .string()
    .min(1, 'La materia debe tener un nombre')
    .max(50, 'Como máximo puede tener 50 caracteres'),
  description: z
    .string()
    .max(100, 'Como maximo la materia puede tener 100 caracteres')
    .optional(),
  name_teacher: z
    .string()
    .max(50, 'Como maximo el nombre del profesor puede tener 100 caracteres')
    .optional(),
});
