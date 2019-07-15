import { hashPassword, generateToken } from './common';
import query from './query';

class UsersUtils {
  static async createUser(data) {
    const {
      first_name, last_name, email, password, isAdmin,
    } = data;
    // Check if Email exists.
    const existingUser = await UsersUtils.getUserByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }
    // Create a new user
    const addUserQuery = `INSERT INTO users(first_name, last_name, email, password, is_admin) 
        VALUES($1, $2, $3, $4, $5) returning *`;
    try {
      const hashedPassword = hashPassword(password);
      const values = [first_name, last_name, email, hashedPassword, isAdmin];
      const createdUser = await query(addUserQuery, values);
      const payload = {
        userId: createdUser[0].user_id,
        isAdmin,
        email,
      };
      const token = await generateToken(payload);

      return {
        token,
        ...createdUser[0],
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  static async getUserByEmail(email) {
    const queryText = 'SELECT * FROM users WHERE email = $1';

    try {
      const users = await query(queryText, [email]);
      return users[0];
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default UsersUtils;
