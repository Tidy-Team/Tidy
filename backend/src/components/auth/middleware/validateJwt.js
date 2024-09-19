import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '../../../config/env.js';
import { Users } from '../../users/models/userModel.js';

/**
 * Middleware para validar el JWT de las cookies o session.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware función.
 *
 * @returns {void}
 *
 * @throws {Error} Si el token no es válido o no se proporciona.
 *
 * @description
 * Este middleware comprueba si hay un token JWT en las cookies o en la sesión de la solicitud.
 * Si encuentra un token, lo verifica utilizando una clave secreta. Si el token es válido,
 * decodifica el token para obtener el ID de usuario y obtiene la información del usuario de la base de datos.
 * La información del usuario se adjunta al objeto de solicitud. Si el token no se proporciona,
 * inválido, o no se encuentra el usuario, responde con un mensaje de error apropiado.
 */

const validateJwt = async (req, res, next) => {
  console.log(req.session);
  console.log('-----------');
  console.log(req.cookies);

  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;

    if (!req.userId) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    const user = await Users.findOne({ where: { id: req.userId } });

    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error('Error al verificar el token: ', err);
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export default validateJwt;
