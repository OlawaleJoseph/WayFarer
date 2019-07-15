import helperFunctions from '../utils/users.utils';

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
}
export default User;
