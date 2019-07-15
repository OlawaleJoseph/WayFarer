import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = (password) => {
  try {
    return bcrypt.hashSync(password, 10);
  } catch (error) {
    throw new Error(error);
  }
};

export const generateToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.jwt_secret, { expiresIn: '2h' });
    return token;
  } catch (error) {
    throw new Error(error);
  }
};
