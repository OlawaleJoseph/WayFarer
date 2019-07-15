import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No Token Provided',
    });
  }
  try {
    const realtoken = token.slice(7);
    const decodedToken = await jwt.verify(realtoken, process.env.jwt_secret);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid Token',
    });
  }
  return null;
};
export const checkAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({
    status: 'error',
    message: 'You are unauthorized',
  });
};
