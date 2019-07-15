/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import User from '../utils/users.utils';
import Bus from '../utils/bus.utils';
import query from '../utils/query';

chai.use(chaiHttp);

const { assert } = chai;

describe('Buses', () => {
  let admin; let newBus;
  beforeEach(async () => {
    const adminData = {
      first_name: 'Oladeji',
      last_name: 'Ayodeji',
      email: 'oladeji@wayfarer.com',
      password: 'oladeji',
      isAdmin: true,
    };
    const busData = {
      manufacturer: 'Toyota',
      model: 'Hiace',
      year: 2016,
      capacity: 22,
      number_plate: 'EKY-568gh',
    };

    admin = await User.createUser(adminData);
    newBus = await Bus.createBus(busData);
  });

  afterEach(async () => {
    await query('DELETE FROM users');
    await query('DELETE FROM buses');
  });
  describe('Should create new Bus', () => {
    it('Should create new Bus', async () => {
      const busData2 = {
        model: 'HIACE',
        manufacturer: 'TOYOTA',
        year: '2017',
        capacity: 18,
        number_plate: 'APP-234HK',
      };
      const res = await chai.request(app)
        .post('/api/v1/buses')
        .set('token', `Bearer ${admin.token}`)
        .send(busData2);
      assert.equal(res.status, 201, 'Should respond with 201 status code');
      assert.equal(res.body.status, 'success', 'Json response status should be success');
      assert.hasAllKeys(res.body, ['status', 'data'], 'The response object shold have sttaus and data keys');
      assert.hasAnyKeys(res.body.data, ['bus_id', 'capacity', 'seats'], 'The json response should contain the keys bus_d, capacity, seats');
    });

    it('Should return error for already registered bus number plate', async () => {
      const busData = {
        manufacturer: 'Toyota',
        model: 'Hiace',
        year: 2016,
        capacity: 22,
        number_plate: 'EKY-568gh',
      };
      const res = await chai.request(app)
        .post('/api/v1/buses')
        .set('token', `Bearer ${admin.token}`)
        .send(busData);
      assert.equal(res.status, 409, 'Should respond with 409 status code');
      assert.equal(res.body.status, 'error', 'Json response status should be error');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');
    });

    it('Should return error for missing fields', async () => {
      const busData3 = {
        model: '',
        manufacturer: 'TOYOTA',
        year: '2015',
        capacity: 20,
        number_plate: 'APP-874PK',
      };
      const res = await chai.request(app)
        .post('/api/v1/buses')
        .set('token', `Bearer ${admin.token}`)
        .send(busData3);
      assert.equal(res.status, 400, 'Should respond with 400 status code');
      assert.equal(res.body.status, 'error', 'Json response status should be error');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');
    });


    it('Should return error for invalid token', async () => {
      const busData4 = {
        model: 'Hiace',
        manufacturer: 'TOYOTA',
        year: '2015',
        capacity: 20,
        number_plate: 'APP-234kK',
      };
      const res = await chai.request(app)
        .post('/api/v1/buses')
        .set('token', 'invalidtoken')
        .send(busData4);
      assert.equal(res.status, 400, 'Should respond with 400 status code');
      assert.equal(res.body.status, 'error', 'Json response status should be error');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Error message should be present');
    });
  });
  describe('Find A Bus', () => {
    it('Should return a bus with the given id', async () => {
      const res = await chai.request(app)
        .get(`/api/v1/buses/${newBus.bus_id}`)
        .set('token', `Bearer ${admin.token}`);
      assert.equal(res.status, 200, 'Should return a status code of 200');
      assert.hasAllKeys(res.body, ['status', 'data'], 'Response body should have status and data keys');
      assert.isObject(res.body.data, 'Data should be an object');
      assert.equal(res.body.data.bus_id, newBus.bus_id, 'The bus object returned should be the same as the specified bus id');
    });


    it('Should return an error with invalid bus id', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buses/h')
        .set('token', `Bearer ${admin.token}`);
      assert.equal(res.status, 400, 'Should return a status code of 400');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');
    });

    it('Should return an error when the bus_id is not found', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buses/1000')
        .set('token', `Bearer ${admin.token}`);
      assert.equal(res.status, 404, 'Should return a status code of 404');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');
    });

    it('Should return an error with invalid token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buses/g')
        .set('token', 'token');
      assert.equal(res.status, 400, 'Should return a status code of 400');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have status and message keys');
    });
  });
  describe('Find All buses', () => {
    it('Should return all Buses', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buses')
        .set('token', `Bearer ${admin.token}`);
      assert.equal(res.status, 200, 'Should return status code of 200');
      assert.isArray(res.body.data, 'Should return an array of Buses');
      res.body.data.forEach((bus) => {
        assert.isObject(bus, 'Should be a bus object');
        assert.hasAnyKeys(bus, 'bus_id', 'Each Object should have bus id');
      });
    });

    it('Should return an error for invalid token', async () => {
      const res = await chai.request(app)
        .get('/api/v1/buses')
        .set('token', 'token');
      assert.equal(res.status, 400, 'Should return status code of 400');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should contain status and message');
      assert.equal(res.body.status, 'error', 'Status should be error');
    });
  });
});
