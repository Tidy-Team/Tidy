import bcrypt from 'bcryptjs';

import generarJwt from '../../../helpers/generarJwt.js';
import validateJwt from '../middleware/validateJwt.js';
import {
  getUserByEmail,
  createUser,
} from '../../users/services/userServices.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExisting = getUserByEmail(email);

    if (userExisting) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = generarJwt(newUser.id);

    res.status(201).json({ token });
  } catch (error) {
    console.error(`Error al registrar al usuario: ${error}`);
    res
      .status(500)
      .json({ message: 'Error en el servidor al registrar el usuario' });
  }
};
