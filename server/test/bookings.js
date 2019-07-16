/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import User from '../utils/users.utils';
import Bus from '../utils/bus.utils';
import Trip from '../utils/trips.utils';
import query from '../utils/query';
import Booking from '../utils/bookings.utils';

chai.use(chaiHttp);

const { assert } = chai;
describe('Booking', () => {
  let user1; let user2; let admin; let bus; let tripObj; let trip;
  beforeEach(async () => {
    const user1Obj = {
      first_name: 'Dele',
      last_name: 'Sesan',
      email: 'delesesan@yahoo.com',
      password: 'password123',
      isAdmin: false,
    };
    const user2Obj = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@yahoo.com',
      password: 'password',
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
    user1 = await User.createUser(user1Obj);
    user2 = await User.createUser(user2Obj);
    admin = await User.createUser(adminObj);
    bus = await Bus.createBus(busObj);
    tripObj = {
      origin: 'Lekki',
      destination: 'CMS',
      fare: 200,
      trip_date: '12/07/2019 15:30:00',
      bus_id: bus.bus_id,
    };
    trip = await Trip.create(tripObj);
  });

  afterEach(async () => {
    await query('DELETE FROM users');
    await query('DELETE FROM buses');
    await query('DELETE FROM trips');
    await query('DELETE FROM bookings');
  });

  describe('Create Booking', () => {
    it('Should create a new Booking', async () => {
      const newBooking = {
        trip_id: trip.trip_id,
        seat_number: 3,
      };
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`)
        .send(newBooking);
      assert.equal(res.status, 201, 'Status code should b 201 if a booking is created');
      assert.equal(res.body.status, 'success');
      assert.hasAllKeys(res.body.data, ['booking_id', 'trip_id', 'bus_id', 'trip_date', 'fare', 'user_id', 'seat_number', 'last_name', 'first_name', 'email']);
      assert.equal(user1.user_id, res.body.data.user_id);
    });

    it('Should create new booking with a random seat number if seat_number is not provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`)
        .send({ trip_id: trip.trip_id });
      assert.equal(res.status, 201, 'Status code should b 201 if a booking is created');
      assert.equal(res.body.status, 'success');
      assert.hasAllKeys(res.body.data, ['booking_id', 'trip_id', 'bus_id', 'trip_date', 'fare', 'user_id', 'seat_number', 'last_name', 'first_name', 'email']);
      assert.equal(user1.user_id, res.body.data.user_id);
    });

    it('Should return an error if trip id is not specified', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`)
        .send();
      assert.equal(res.status, 400, '400 status code is expected');
      assert.equal(res.body.status, 'error');
    });

    it('Should return an error if no token is provided', async () => {
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .send({ trip_id: 1 });
      assert.equal(res.status, 401, '401 status code is expected');
      assert.equal(res.body.status, 'error');
    });

    it('Should return an error if the choosen seat is not available', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 4 }, user1.user_id);
      const newTrip = {
        trip_id: trip.trip_id,
        seat_number: 4,
      };
      const res = await chai.request(app)
        .post('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`)
        .send(newTrip);
      assert.equal(res.status, 422, '422 status code is expected');
      assert.equal(res.body.status, 'error');
    });
  });
  describe('Get A Booking', () => {
    it('Should get the booking with the given booking id', async () => {
      const booking = { trip_id: trip.trip_id, seat_number: 4 };
      const newBooking = await Booking.createBooking(booking, user1.user_id);
      const res = await chai.request(app)
        .get(`/api/v1/bookings/${newBooking.booking_id}`)
        .set('token', `Bearer ${user1.token}`);
      assert.equal(res.status, 200);
      assert.equal(res.body.data.user_id, user1.user_id);
      assert.equal(res.body.status, 'success');
      assert.isObject(res.body.data);
      assert.hasAnyKeys(res.body.data, ['booking_id', 'user_id', 'trip_id', 'trip_date', 'bus_id', 'first_name', 'last_name', 'email', 'seat_number']);
    });

    it('Should return an error for invalid booking id', async () => {
      const res = await chai.request(app)
        .get('/api/v1/bookings/k')
        .set('token', `Bearer ${user1.token}`);
      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });

    it('Should return an error if no token is provided', async () => {
      const booking = { trip_id: trip.trip_id, seat_number: 4 };
      const newBooking = await Booking.createBooking(booking, user1.user_id);
      const res = await chai.request(app)
        .get(`/api/v1/bookings/${newBooking.booking_id}`);
      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });

    it('Should return an error if user does not own the booking', async () => {
      const booking = { trip_id: trip.trip_id, seat_number: 4 };
      const newBooking = await Booking.createBooking(booking, user1.user_id);
      const res = await chai.request(app)
        .get(`/api/v1/bookings/${newBooking.booking_id}`)
        .set('token', `Bearer ${`Bearer ${user2.token}`}`);
      assert.equal(res.status, 403);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });

    it('Should return an error for non existent booking', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 9 }, user1.user_id);
      const res = await chai.request(app)
        .get('/api/v1/bookings/90000')
        .set('token', `Bearer ${user1.token}`);
      assert.equal(res.status, 404);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });
  });
  describe('Get All Bookings', () => {
    it('Admin can get all booking in the database', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 9 }, user1.user_id);
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 6 }, user2.user_id);
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'success');
      assert.isArray(res.body.data);
      assert.isNotEmpty(res.body.data);
    });

    it('User can only see bookings belonging to him/her', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 9 }, user1.user_id);
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set('token', `Bearer ${user1.token}`);

      assert.equal(res.status, 200);
      assert.equal(res.body.status, 'success');
      assert.isArray(res.body.data);
      res.body.data.forEach((booking) => {
        assert.equal(booking.user_id, user1.user_id);
      });
    });

    it('Should return an error if no token is provided', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 9 }, user1.user_id);
      const res = await chai.request(app)
        .get('/api/v1/bookings');

      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });

    it('Should return an error for invalid', async () => {
      await Booking.createBooking({ trip_id: trip.trip_id, seat_number: 9 }, user1.user_id);
      const res = await chai.request(app)
        .get('/api/v1/bookings')
        .set('token', 'ghh76h');

      assert.equal(res.status, 400);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });
  });
  describe('Delete Booking', () => {
    it('User should be able to delete his/her booking', async () => {
      const bookingObj = { trip_id: trip.trip_id, seat_number: 9 };
      const booking = await Booking.createBooking(bookingObj, user1.user_id);
      const res = await chai.request(app)
        .delete(`/api/v1/bookings/${booking.booking_id}`)
        .set('token', `Bearer ${user1.token}`);
      assert.equal(res.status, 204);
      assert.isUndefined(res.body.data);
    });
    it('Should return an error if no token is provided', async () => {
      const bookingObj = { trip_id: trip.trip_id, seat_number: 9 };
      const booking = await Booking.createBooking(bookingObj, user1.user_id);
      const res = await chai.request(app)
        .delete(`/api/v1/bookings/${booking.booking_id}`);

      assert.equal(res.status, 401);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });
    it('Should return an error if the booking doesnt belong to the user', async () => {
      const bookingObj = { trip_id: trip.trip_id, seat_number: 9 };
      const booking = await Booking.createBooking(bookingObj, user1.user_id);
      const res = await chai.request(app)
        .delete(`/api/v1/bookings/${booking.booking_id}`)
        .set('token', `Bearer ${user2.token}`);

      assert.equal(res.status, 403);
      assert.equal(res.body.status, 'error');
      assert.hasAllKeys(res.body, ['status', 'message']);
    });
  });
});
