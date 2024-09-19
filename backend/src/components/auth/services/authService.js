import bcrypt from 'bcryptjs';

import generarJwt from '../../../helpers/generarJwt.js';
import validateJwt from '../middleware/validateJwt.js';
import {
  getUserByEmail,
  createUser,
} from '../../users/services/userServices.js';

export const signUp = async req => {
  const { name, email, password } = req.body;
  const userExisting = await getUserByEmail(email);

  if (userExisting) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  const token = await generarJwt(newUser.id);

  return { token };
};
