export const createSession = (req, res) => {
  const token = req.cookies.authToken || req.session.token;

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  res.status(200).json({
    message: 'Sesión creada exitosamente',
    token,
  });
};

export const validateSession = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  res.status(200).json({
    message: 'Acceso permitido a área protegida',
    user: req.user,
  });
};
