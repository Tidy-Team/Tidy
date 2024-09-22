import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(1, 'Se requiere el nombre')
    .max(50, 'El nombre debe ser de 50 caracteres o menos'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(6, 'La contraseña debe ser de al menos 6 caracteres o más'),
  rol: z.enum(['estudiante', 'tutor', 'padre']).optional(),
  fecha_registro: z.date().optional(),
});
