import bcrypt from 'bcryptjs';

import generarJwt from '../../../helpers/generarJwt.js';
import {
  getUserByEmail,
  createUser,
} from '../../users/services/userServices.js';

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
