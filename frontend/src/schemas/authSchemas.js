import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingrese una dirección de correo electrónico válida',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  }),
})

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'El nombre completo es obligatorio',
    })
    .min(3, {
      message: 'El nombre completo debe tener al menos 3 caracteres',
    }),
  email: z.string().email({
    message: 'Por favor, ingrese una dirección de correo electrónico válida',
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres',
  }),
})
