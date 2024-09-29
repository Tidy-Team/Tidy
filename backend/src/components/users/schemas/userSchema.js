import { z } from 'zod';
import moment from 'moment-timezone';

const timeZone = 'America/Argentina/Buenos_Aires';

export const userSchema = z.object({
  name: z.string().min(1, 'Se requiere el nombre').max(50, 'El nombre debe ser de 50 caracteres o menos'),
  email: z
    .string()
    .email('Email inválido')
    .transform(email => email.trim().toLowerCase()), // Asegura que el email esté en minúsculas y sin espacios
  password: z
    .string()
    .min(6, 'La contraseña debe ser de al menos 6 caracteres o más')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  rol: z.enum(['estudiante', 'tutor', 'padre']).optional().default('estudiante'), // Valor predeterminado
  fecha_registro: z
    .string()
    .default(() => moment().tz(timeZone).toISOString()) // Establece la fecha actual en la zona horaria de Buenos Aires en formato ISO
    .refine(date => {
      const parsedDate = moment(date);
      if (!parsedDate.isValid()) {
        console.error(`fecha_registro no es una fecha válida: ${date}`);
        return false;
      }
      const zonedDate = moment.tz(parsedDate, timeZone).toDate();
      return zonedDate <= new Date();
    }, 'La fecha de registro no puede ser en el futuro'), // Validación de fecha
  emailVerificationToken: z.string().optional(), // Token de verificación de email
  emailVerified: z.boolean().default(false), // Estado de verificación de email
});

export const signInSchema = z.object({
  email: z
    .string()
    .email('Email inválido')
    .transform(email => email.trim().toLowerCase()), // Asegura que el email esté en minúsculas y sin espacios
  password: z.string().min(6, 'Contraseña inválida'),
});
