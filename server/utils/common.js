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
export const verifyPassword = async (password, userPassword) => {
  try {
    const verifiedPassword = await bcrypt.compare(password, userPassword);
    if (!verifiedPassword) return false;
    return true;
  } catch (error) {
    return false;
  }
};
export const verifyUser = (token_user, id) => {
  if (!token_user.isAdmin) {
    if (token_user.userId !== parseInt(id, 10)) { throw new Error('You are not authorised to perform this operation'); }
  }
  return true;
};
