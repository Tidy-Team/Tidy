import { signUp, signIn, requestPasswordReset, resetPassword, verifyResetToken } from '../services/authService.js';
import { userSchema, signInSchema } from '../../users/schemas/userSchema.js';
import { ZodError } from 'zod';

/**
 * Función del controlador para manejar el registro de usuarios.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene los datos del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {Promise<void>} - Devuelve una promesa que se resuelve en void.
 *
 * @throws {ZodError} - Lanza errores de validación si el cuerpo de la solicitud no coincide con el esquema del usuario.
 * @throws {Error} - Lanza un error del servidor si hay un problema durante el proceso de registro.
 */
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

/**
 * Función del controlador para manejar el inicio de sesión de usuarios.
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - El cuerpo de la solicitud que contiene las credenciales del usuario.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que se resuelve cuando el proceso de inicio de sesión se completa.
 *
 * @throws {ZodError} - Lanza errores de validación si el cuerpo de la solicitud no coincide con el esquema de inicio de sesión.
 * @throws {Error} - Lanza un error del servidor si hay un problema durante el proceso de inicio de sesión.
 */
export const signInUser = async (req, res) => {
  try {
    signInSchema.parse(req.body);

    const result = await signIn(req);
    const token = result.token;
    // Almacenar el token en la sesión del servidor
    req.session.token = token;

    // Almacenar el token en una cookie segura
    res.cookie('authToken', token, {
      httpOnly: true, // La cookie no es accesible desde JavaScript
      secure: false, // Cambiar a true en producción con HTTPS
      maxAge: 3600000, // Expiración en milisegundos (1 hora)
    });

    return res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(`Error en el controlador al iniciar sesión: ${error}`);
    // Manejo de errores de validación de Zod
    if (error instanceof ZodError) {
      const validationErrors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        message: 'Error de validación al iniciar sesión',
        errors: validationErrors,
      });
    }

    // Responde con error del servidor
    res.status(500).json({
      message: 'Error en el servidor al iniciar sesión',
      error: error.message,
    });
  }
};

export const requestPasswordResetCtrl = async (req, res) => {
  const { email } = req.body;

  try {
    await requestPasswordReset(email);
    res.status(200).json({ message: 'Correo de restablecimiento de contraseña enviado' });
  } catch (error) {
    console.error(`Error al solicitar el restablecimiento de contraseña: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

export const verifyResetTokenCtrl = async (req, res) => {
  const { token } = req.params; // Acceso al parámetro :token

  try {
    await verifyResetToken(token);
    res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    console.error(`Error al verificar el token de restablecimiento: ${error}`);
    res.status(500).json({ message: error.message });
  }
};

export const resetPasswordCtrl = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    await resetPassword(token, newPassword);

    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error(`Error al restablecer la contraseña: ${error}`);

    res.status(500).json({ message: error.message });
  }
};
