import bcrypt from 'bcryptjs';

export const hashPassword = (password) => {
  try {
    return bcrypt.hashSync(password, 10);
  } catch (error) {
    throw new Error(error);
  }
};
