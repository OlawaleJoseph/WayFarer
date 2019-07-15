/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import Users from '../utils/users.utils';
import query from '../utils/query';

const { assert } = chai;

chai.use(chaiHttp);

describe('Users', () => {
  let user;
  beforeEach(async () => {
    const userObj = {
      first_name: 'Mike',
      last_name: 'James',
      email: 'mike@gmail.com',
      password: 'mypassword',
      isAdmin: false,
    };
    user = await Users.createUser(userObj);
  });
  afterEach(async () => {
    await query('DELETE FROM users');
  });

  describe('Sign Up Users', () => {
    it('Should Create a user', async () => {
      const newUser = {
        first_name: 'Mike',
        last_name: 'Jordan',
        email: 'jordanmike@gmail.com',
        password: 'password',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser);
      assert.equal(res.status, 201, 'Should return 201 for successful user registration');
      assert.equal(res.body.status, 'success');
      assert.isObject(res.body.data, 'Data should be an object');
      assert.hasAllKeys(res.body.data, ['token', 'is_admin', 'user_id'], 'The reponse should include the user object and token generated');
    });

    it('Should Create admin users', async () => {
      const newUser = {
        first_name: 'John',
        last_name: 'Jordan',
        email: 'johnjordan@wayfarer.com',
        password: 'password',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser);
      assert.equal(res.status, 201, 'Should return 201 for successful user registration');
      assert.equal(res.body.status, 'success');
      assert.equal(res.body.data.is_admin, true, 'Admin role should be true');
    });

    it('Should return an error for missing fields', async () => {
      const user2 = {
        first_name: '',
        last_name: 'Jordan',
        email: 'email1@gmail.com',
        password: 'password',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(user2);
      assert.equal(res.status, 400, 'It Should return a 400 status code');
      assert.equal(
        res.body.status,
        'error',
        'Response status should be error',
      );
      assert.isNotNull(
        res.body.message,
        'The response message should not be null',
      );
    });

    it('Should return error for an already registered email', async () => {
      const newUser = {
        first_name: 'Daniel',
        last_name: 'James',
        email: 'mike@gmail.com',
        password: 'password123',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signup')
        .send(newUser);
      assert.equal(res.status, 409, 'Should return 409 status code');
      assert.equal(
        res.body.status,
        'error',
        'Response status should be error',
      );
    });
  });
});
