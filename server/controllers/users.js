import helperFunctions from '../utils/users.utils';
import { generateToken, verifyPassword } from '../utils/common';

class User {
  static async create(req, res) {
    try {
      const newUser = await helperFunctions.createUser(req.body);
      const { user_id, is_admin, token } = newUser;
      return res.header('token', newUser.token).status(201).json({
        status: 'success',
        data: {
          user_id,
          is_admin,
          token,
        },
      });
    } catch (error) {
      return res.status(409).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async login(req, res) {
    const user = await helperFunctions.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User does not exist',
      });
    }
    try {
      const correctPassword = await verifyPassword(
        req.body.password,
        user.password,
      );
      if (!correctPassword) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid Password',
        });
      }

      const { password, date_registered, ...userObj } = user;
      const payload = {
        userId: user.user_id,
        isAdmin: user.is_admin,
        email: user.email,
      };
      const token = await generateToken(payload);
      return res.header('token', token).status(200).json({
        status: 'success',
        data: {
          token,
          ...userObj,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    }
  }
}
export default User;
