import { signUp } from '../services/authService.js';
import { userSchema } from '../../users/schemas/userSchema.js';
import { ZodError } from 'zod';

export const signUpUser = async (req, res) => {
  try {
    userSchema.parse(req.body);
    const result = await signUp(req);

    res.status(201).json({
      message: 'El usuario se registró correctamente',
      user: result.user,
    });
  } catch (error) {
    console.error(`Error en el controlador al registrar un usuario: ${error}`);

    // Manejo de errores de validación de Zod
    if (error instanceof ZodError) {
      // Extraer y formatear los mensajes de error de Zod
      const validationErrors = error.errors.map(err => ({
        path: err.path.join('.'), // Ruta de lo que causó el error
        message: err.message,
      }));

      //Responde con error de validación
      return res.status(400).json({
        message: 'Error de validación al registrar el usuario',
        errors: validationErrors,
      });
    }

    //Responde con error del servidor
    res.status(500).json({
      message: 'Error en el servidor al registrar el usuario',
      error: error.message,
    });
  }
};

export const signInUser = async (req, res) => {};
