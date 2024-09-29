import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import generarJwt from '../../../helpers/generarJwt.js';

import { Op } from 'sequelize';
import { getUserByEmail, createUser } from '../../users/services/userServices.js';
import { sendPasswordResetEmail } from '../../email/services/emailService.js';
import { Users } from '../../users/models/userModel.js';

/**
 * Registra un nuevo usuario creando una cuenta y generando un token JWT.
 *
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.name - El nombre del usuario.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve en un objeto que contiene el token JWT.
 * @throws {Error} Si el usuario ya existe.
 */
export const signUp = async req => {
  const { name, email, password, rol } = req.body;

  //Validar si los campos estan completos
  if (!name || !email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  const userExisting = await getUserByEmail(email);

  if (userExisting) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
    rol,
  });

  const token = await generarJwt(newUser.id);

  return { token };
};

/**
 * Inicia sesión de un usuario existente y genera un token JWT.
 *
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud.
 * @param {string} req.body.email - El correo electrónico del usuario.
 * @param {string} req.body.password - La contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve en un objeto que contiene el token JWT.
 * @throws {Error} Si el usuario no existe o la contraseña es incorrecta.
 */
export const signIn = async req => {
  const { email, password } = req.body;

  //Validar si los campos estan completos
  if (!email || !password) {
    throw new Error('Todos los campos son obligatorios');
  }

  //Verificar si existe el email del usuario
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error('Email o contraseña incorrectos');
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new Error('La contraseña es incorrecta');
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
  const tokenExpiration = Date.now() + 3600000; // 1 hora

  // Guarda el token y su expiración en el usuario
  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(tokenExpiration); // Asegúrate de que sea una instancia de Date
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
