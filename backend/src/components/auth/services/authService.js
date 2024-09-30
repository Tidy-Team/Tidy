import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import generarJwt from '../../../helpers/generarJwt.js';

import { Op } from 'sequelize';
import { getUserByEmail, createUser } from '../../users/services/userServices.js';
import { sendEmailVerification, sendPasswordResetEmail } from '../../email/services/emailService.js';
import { Users } from '../../users/models/userModel.js';

/**
 * Registra un nuevo usuario creando una cuenta y generando un token JWT.
 *
 * @param {Object} userData - Los datos del usuario.
 * @param {string} userData.name - El nombre del usuario.
 * @param {string} userData.email - El correo electrónico del usuario.
 * @param {string} userData.password - La contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve en un objeto que contiene el token JWT.
 * @throws {Error} Si el usuario ya existe.
 */
export const signUp = async userData => {
  const { name, email, password, rol } = userData;

  // Validar si los campos están completos
  if (!name || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  const userExisting = await getUserByEmail(email);

  if (userExisting) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const emailVerificationToken = crypto.randomBytes(32).toString('hex');

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    rol,
    fecha_registro: new Date(),
    emailVerificationToken,
    emailVerified: false,
  });

  await sendEmailVerification(newUser.email, emailVerificationToken);

  const token = await generarJwt(newUser.id);

  return { message: 'Usuario registrado. Por favor, verifica tu email.', token };
};

/**
 * Inicia sesión de un usuario existente y genera un token JWT.
 *
 * @param {Object} userData - Los datos del usuario.
 * @param {string} userData.email - El correo electrónico del usuario.
 * @param {string} userData.password - La contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve en un objeto que contiene el token JWT.
 * @throws {Error} Si el usuario no existe o la contraseña es incorrecta.
 */
export const signIn = async ({ email, password }) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error('La contraseña es incorrecta');
  }

  if (!user.emailVerified) {
    throw new Error('Por favor, verifica tu email antes de iniciar sesión');
  }

  const token = await generarJwt(user.id);

  return { token };
};

export const requestPasswordReset = async email => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Genera un token de restablecimiento y establece su expiración
  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpiration = Date.now() + 108000000; // 30 minutos

  // Guarda el token y su expiración en el usuario
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(tokenExpiration);
  await user.save();

  // Envía el correo de restablecimiento de contraseña
  await sendPasswordResetEmail(user.email, token);
};

export const verifyResetToken = async token => {
  const user = await Users.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { [Op.gt]: new Date() }, // Asegúrate de que sea una instancia de Date
    },
  });

  if (!user) {
    throw new Error('Token inválido o expirado');
  }

  return user;
};

export const resetPassword = async (token, newPassword) => {
  // Verifica la validez del token
  const user = await verifyResetToken(token);

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualiza la contraseña del usuario y elimina el token de restablecimiento
  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();
};

/**
 * Verifica el token de verificación de email y actualiza el estado del usuario.
 *
 * @param {string} token - El token de verificación de email.
 * @returns {Promise<void>} Una promesa que se resuelve cuando el email ha sido verificado.
 * @throws {Error} Si el token es inválido o ha expirado.
 */
export const verifyEmailToken = async token => {
  const user = await Users.findOne({
    where: {
      emailVerificationToken: token,
    },
  });

  if (!user) {
    throw new Error('Token inválido o expirado');
  }

  user.emailVerified = true;
  user.emailVerificationToken = null;
  await user.save();
};
