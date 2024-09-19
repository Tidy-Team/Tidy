import { signUp } from '../services/authService.js';
import { userSchema } from '../../users/schemas/userSchema.js';
export const signUpUser = async (req, res) => {
  try {
    userSchema.parse(req.body);
    const result = await signUp(req);
    res.status(201).json({ message: 'El usuario se registro correctamente' });
  } catch (error) {
    console.error(`Error en el controlador al registrar un usuario: ${error}`);
    res
      .status(500)
      .json({ message: 'Error en el servidor al registrar el usuario' });
  }
};
