import debug from 'debug';
import {
  users, buses, trips, bookings,
} from './seeder.data';
import query from '../utils/query';

export const seedDb = async () => {
  const usersText = 'INSERT INTO users(first_name, last_name, email, password, is_admin) VALUES($1, $2, $3, $4, $5) ';
  const busText = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity, seats, available) VALUES($1, $2, $3, $4, $5, $6, $7)';
  const tripText = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare, status, trip_completed) VALUES($1, $2, $3, $4, $5, $6, $7)';
  const bookingText = 'INSERT INTO bookings(trip_id, user_id, seat_number) VALUES($1, $2, $3)';
  try {
    await query(usersText, users[0]);
    await query(usersText, users[1]);
    await query(busText, buses[0]);
    await query(busText, buses[1]);
    await query(tripText, trips[0]);
    await query(tripText, trips[1]);
    await query(bookingText, bookings[0]);
    await query(bookingText, bookings[1]);
  } catch (error) {
    debug('http')(error);
    process.exit(0);
  }
};

require('make-runnable');
