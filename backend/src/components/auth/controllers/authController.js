import {
  signUp,
  signIn,
  requestPasswordReset,
  resetPassword,
  verifyResetToken,
  verifyEmailToken,
} from '../services/authService.js';

export const signUpUser = async (req, res) => {
  try {
    const { token, message } = await signUp(req.body);

    res.status(201).json({ token, message });
  } catch (error) {
    console.error(`Error en el controlador al registrar un usuario: ${error}`);

    //Responde con error del servidor
    res.status(500).json({
      message: 'Error en el servidor al registrar el usuario',
      error: error.message,
    });
  }
};

export const signInUser = async (req, res) => {
  try {
    const result = await signIn(req.body);
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
    if (
      error.message === 'El email ingresado no existe' ||
      error.message === 'La contraseña es incorrecta' ||
      error.message === 'Por favor, verifica tu email antes de iniciar sesión'
    ) {
      return res.status(400).json({
        message: 'Error al iniciar sesión',
        error: error.message,
      });
    }

    // Responde con error del servidor
    res.status(500).json({
      message: 'Error en el servidor',
      error: error.message,
    });
  }
};

export const signOutUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(400).json({ message: 'No hay token para cerrar sesión' });
    }

    //Elimina el token de la sesión del servidor
    req.session.token = null;

    // Elimina la cookie del cliente
    res.clearCookie('authToken');

    return res.json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    console.error(`Error en el controlador al cerrar sesión: ${error}`);

    res.status(500).json({
      message: `Error en el servidor al cerrar sesión: ${error.message}`,
    });
  }
};

// Controlador para enviar el correo de restablecer la contraseñ
export const requestPasswordResetCtrl = async (req, res) => {
  const { email } = req.body;

  try {
    // Envía el correo de restablecimiento de contraseña
    await requestPasswordReset(email);

    res.status(200).json({ message: 'Correo de restablecimiento de contraseña enviado' });
  } catch (error) {
    console.error(`Error al solicitar el restablecimiento de contraseña: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

// Controlador para verificar que el token sea válido
export const verifyResetTokenCtrl = async (req, res) => {
  const { token } = req.params;

  try {
    // Verifica que el token recibido es válido
    await verifyResetToken(token);

    res.status(200).json({ message: 'Token válido' });
  } catch (error) {
    console.error(`Error al verificar el token de restablecimiento: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

// Controlador para recibir la nueva contraseña y resetearla
export const resetPasswordCtrl = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Espera la nueva contraseña
    await resetPassword(token, newPassword);

    res.status(200).json({ message: 'Contraseña restablecida correctamente' });
  } catch (error) {
    console.error(`Error al restablecer la contraseña: ${error}`);

    res.status(500).json({ message: error.message });
  }
};

// Controlador para verificar el email del usuario
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    await verifyEmailToken(token);

    res.status(200).json({ message: 'Email verificado correctamente' });
  } catch (error) {
    console.error(`Error al verificar el email: ${error}`);

    res.status(400).json({ message: error.message });
  }
};
