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
  describe('signin users', () => {
    it('Should signin users', async () => {
      const signinData = {
        email: user.email,
        password: 'mypassword',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(signinData);
      assert.equal(res.status, 200, 'Should return 200 status code');
      assert.equal(
        res.body.status,
        'success',
        'Response status should be success',
      );
      assert.hasAnyKeys(res.body.data, 'token', 'Should Generate Token');
    });

    it('Should return Error for unregistered email', async () => {
      const wrongData = {
        email: 'newemail@gmail.com',
        password: user.password,
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(wrongData);
      assert.equal(res.status, 404, 'Should return 404 status code');
      assert.equal(
        res.body.status,
        'error',
        'Response status should be error',
      );
      assert.hasAnyKeys(
        res.body,
        'message',
        'Response should contain an error message',
      );
    });

    it('Should return Error for wrong password', async () => {
      const wrongData = {
        email: user.email,
        password: 'userpassword',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(wrongData);
      assert.equal(res.status, 400, 'Should return 400 status code');
      assert.equal(
        res.body.status,
        'error',
        'Response status should be error',
      );
      assert.hasAnyKeys(
        res.body,
        'message',
        'Response should contain an error message',
      );
    });

    it('Should return Error for missing fields', async () => {
      const wrongData = {
        email: user.email,
        password: '',
      };
      const res = await chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(wrongData);
      assert.equal(res.status, 400, 'Should return 400 status code');
      assert.equal(
        res.body.status,
        'error',
        'Response status should be error',
      );
      assert.hasAnyKeys(
        res.body,
        'message',
        'Response should contain an error message',
      );
    });
  });
  describe('Get A User', () => {
    it('Should get User with given id', async () => {
      const res = await chai
        .request(app)
        .get(`/api/v1/auth/users/${user.user_id}`)
        .set('token', user.token);
      assert.equal(res.status, 200, 'Status code should 200 for success');
      assert.equal(res.body.data.user_id, user.user_id, 'The user id given should be equal to the user id in the response object');
      assert.isObject(res.body.data, 'Data should be an object');
    });

    it('Should return error for invalid user id', async () => {
      const res = await chai
        .request(app)
        .get('/api/v1/auth/users/c');
      assert.equal(res.status, 400, 'Status code should 400 for error');
      assert.equal(res.body.status, 'error');
      assert.isString(res.body.message, 'Message should be a string');
    });

    it("A non admin user can not access another user's infomation", async () => {
      const user4 = {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'janedoe@gmail.com',
        password: 'janedoe',
        isAdmin: false,
      };
      const createdUser = await User.createUser(user4);
      const res = await chai
        .request(app)
        .get(`/api/v1/auth/users/${createdUser.user_id}`)
        .set('token', user.token);
      assert.equal(res.status, 401, 'Status code should 400 for error');
      assert.equal(res.body.status, 'error');
      assert.isString(res.body.message, 'Message should be a string');
    });
  });
});
