import Bus from './bus.utils';
import query from './query';

class Trips {
  static async create(body) {
    const {
      origin, destination, trip_date, fare, bus_id,
    } = body;
    try {
      const bus = await Bus.findBusById(bus_id);
      if (!bus.available) { throw new Error('The bus with the given Id is on another trip'); }
      const newTripQuery = 'INSERT INTO trips(bus_id, origin, destination, trip_date, fare, status, trip_completed) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
      const createdTrip = await query(newTripQuery, [
        bus_id,
        origin.toUpperCase(),
        destination.toUpperCase(),
        trip_date,
        fare,
        'active',
        false,
      ]);
      await Bus.updateBusAvailability(bus);
      const { trip_completed, ...trip } = createdTrip[0];
      return trip;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async findTrip(id) {
    const findOneTripQuery = 'SELECT * FROM trips WHERE trip_id = $1';
    try {
      const trip = await query(findOneTripQuery, [id]);
      if (!trip[0]) { throw new Error('Trip not Found'); }
      return trip[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAlltrips() {
    const alltripsQuery = 'SELECT * FROM trips';
    try {
      const trips = await query(alltripsQuery);
      return trips.map((trip) => {
        const { trip_completed, status, ...tripObj } = trip;
        return tripObj;
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static filterTrips(params, data) {
    let { origin, destination } = params;
    if (origin && destination) {
      origin = origin.toUpperCase();
      destination = destination.toUpperCase();
      return data.filter(item => item.origin === origin && item.destination === destination);
    } if (origin) {
      origin = origin.toUpperCase();
      return data.filter(item => item.origin === origin);
    }
    destination = destination.toUpperCase();
    return data.filter(item => item.destination === destination);
  }
}
export default Trips;
