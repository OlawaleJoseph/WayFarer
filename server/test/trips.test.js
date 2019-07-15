/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import Bus from '../utils/bus.utils';
import User from '../utils/users.utils';
import Trip from '../utils/trips.utils';
import query from '../utils/query';

chai.use(chaiHttp);

const { assert } = chai;

describe('trips', () => {
  let user; let admin; let bus; let tripObj; let trip2Obj; let bus2;
  beforeEach(async () => {
    const userObj = {
      first_name: 'Dele',
      last_name: 'Sesan',
      email: 'delesesan@yahoo.com',
      password: 'password123',
      isAdmin: false,
    };
    const adminObj = {
      first_name: 'Wale',
      last_name: 'Deko',
      email: 'waledeko@wayfarer.com',
      password: 'password123',
      isAdmin: true,
    };
    const busObj = {
      manufacturer: 'Toyota',
      year: 2016,
      model: 'Hiace',
      capacity: 42,
      number_plate: 'APP-248HK',
    };
    const bus2Obj = {
      manufacturer: 'Toyota',
      year: 2016,
      model: 'Hiace',
      capacity: 42,
      number_plate: 'APP-879HH',
    };

    user = await User.createUser(userObj);
    admin = await User.createUser(adminObj);
    bus = await Bus.createBus(busObj);
    bus2 = await Bus.createBus(bus2Obj);
    tripObj = {
      origin: 'Lekki',
      destination: 'CMS',
      fare: 200,
      trip_date: '2019-07-02 15:30:00 +01:00',
      bus_id: bus.bus_id,
    };
    trip2Obj = {
      origin: 'Yaba',
      destination: 'Maryland',
      fare: 100,
      trip_date: '2019-07-13 12:30:00 +01:00',
      bus_id: bus2.bus_id,
    };
  });

  afterEach(async () => {
    await query('DELETE FROM users');
    await query('DELETE FROM buses');
    await query('DELETE FROM trips');
  });

  describe('Create Trips', () => {
    it('Should create a trip with valid inputs', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/trips')
        .set('token', `Bearer ${admin.token}`)
        .send(tripObj);
      assert.equal(res.status, 201, 'Should return 201 status code for success');
      assert.hasAllKeys(res.body, ['status', 'data'], 'Response body should have succes and data keys');
      assert.hasAllKeys(res.body.data, ['trip_id', 'bus_id', 'origin', 'destination', 'fare', 'trip_date', 'status']);
    });

    it('Should return 403 error for a non admin user', async () => {
      const res = await chai
        .request(app)
        .post('/api/v1/trips')
        .set('token', `Bearer ${user.token}`)
        .send(tripObj);
      assert.equal(res.status, 403, 'Should return 403 status code for non admin users');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');
    });

    it('Should return 422 error if bus is already on another trip', async () => {
      await Trip.create(tripObj);
      const tripObj2 = {
        origin: 'MaryLand',
        destination: 'Yaba',
        fare: 100,
        trip_date: '19/07/2019 12:30:00',
        bus_id: bus.bus_id,
      };
      const res = await chai
        .request(app)
        .post('/api/v1/trips')
        .set('token', `Bearer ${admin.token}`)
        .send(tripObj2);
      assert.equal(res.status, 422, 'Should return 422 status code if bus is already on another trip');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');
    });

    it('Should return error status 400  for missing fields', async () => {
      const tripObj1 = {
        origin: '',
        destination: 'CMS',
        fare: 200,
        trip_date: '12/07/2019 15:30:00',
        bus_id: bus.bus_id,
      };
      const res = await chai
        .request(app)
        .post('/api/v1/trips')
        .set('token', `Bearer ${admin.token}`)
        .send(tripObj1);
      assert.equal(res.status, 400, 'Should return 400 status code for non admin users');
      assert.hasAllKeys(res.body, ['status', 'message'], 'Response body should have error and message keys');
    });
  });
  describe('Get A Trip', async () => {
    it('Should get an trip with the given id', async () => {
      const trip = await Trip.create(tripObj);
      const res = await chai.request(app)
        .get(`/api/v1/trips/${trip.trip_id}`)
        .set('token', `Bearer ${user.token}`);
      assert.equal(res.status, 200, 'Should return 200 for success');
      assert.equal(trip.trip_id, res.body.data.trip_id, 'Trip id retrieved should match the one sent on success');
      assert.hasAnyKeys(res.body.data, ['origin', 'destination', 'fare', 'trip_date', 'trip_id', 'bus_id']);
    });

    it('Should return a 400 error with an invalid trip id', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips/h')
        .set('token', `Bearer ${user.token}`);
      assert.equal(res.status, 400, 'Should return 400 for invalid trip id');
      assert.hasAllKeys(res.body, ['status', 'message'], 'response should have status and message keys');
      assert.equal(res.body.status, 'error', 'Response status should be error for invalid trip id');
    });

    it('Should return a 404 error if trip does not exist', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips/900')
        .set('token', `Bearer ${user.token}`);
      assert.equal(res.status, 404, 'Should return 404 if trip does not exist');
      assert.hasAllKeys(res.body, ['status', 'message'], 'response should have status and message keys');
      assert.equal(res.body.status, 'error', 'Response status should be error for non existent trip');
    });
  });
  describe('Get All Trips', () => {
    it('Should get all Trips', async () => {
      const res = await chai.request(app)
        .get('/api/v1/trips')
        .set('token', user.token);

      assert.equal(res.status, 200);
      assert.isArray(res.body.data);
      res.body.data.forEach((trip) => {
        assert.equal(trip.status, 'active', 'Users should only see active trips');
      });
    });

    it('Should get all trips based on the query search', async () => {
      await Trip.createTrip(tripObj);
      await Trip.createTrip(trip2Obj);
      const res = await chai.request(app)
        .get('/api/v1/trips/?origin=yaba')
        .set('token', user.token);
      assert.equal(res.status, 200);
      assert.isArray(res.body.data);
      res.body.data.forEach((trip) => {
        assert.include(trip, { origin: 'YABA' }, 'It should return the trip(s) that matches the query');
      });
    });
  });
});
