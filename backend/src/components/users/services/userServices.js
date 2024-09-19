import { Users } from '../models/userModel';

//
/**
 * Recupera un usuario por su dirección de correo electrónico.
 *
 * @param {string} email - La dirección de correo electrónico del usuario a recuperar.
 * @returns {Promise<Object>} Una promesa que busca al usuario por su correo
 * @throws {Error} Si el email existe devuelve un error o si ocurrió un error en la consulta.
 */

export const getUserByEmail = async email => {
  try {
    const existingUser = await Users.findOne({ where: { email } });

    if (existingUser) {
      throw new Error(`El email del usuario ya existe. Por favor, pruebe otro`);
    }
    return { message: 'El usuario no se encontró' };
  } catch (error) {
    console.error(`Se encontró un error al buscar el usuario: ${error}`);
    throw error;
  }
};
