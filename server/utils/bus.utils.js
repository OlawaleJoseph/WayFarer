/* eslint-disable no-param-reassign */
import query from './query';

class Bus {
  static async createBus(data) {
    const queryText = 'INSERT INTO buses(number_plate, manufacturer, model, year, capacity, seats, available) VALUES($1, $2, $3, $4, $5, $6, $7) returning *';
    const {
      number_plate, manufacturer, model, year, capacity,
    } = data;
    const seatsNumberArray = Bus.generateSeats(capacity);
    try {
      const newBus = await query(queryText, [
        number_plate.toUpperCase(),
        manufacturer,
        model,
        year,
        capacity,
        seatsNumberArray,
        true,
      ]);
      return newBus[0];
    } catch (error) {
      throw new Error(error);
    }
  }

  static generateSeats(busCapacity) {
    const seats = [];
    while (busCapacity) {
      seats.push(busCapacity);
      // eslint-disable-next-line no-plusplus
      busCapacity--;
    }
    return seats;
  }

  static async findBusByPlate(plate) {
    const findBusQuery = 'SELECT * FROM buses WHERE number_plate = $1';
    try {
      const foundBus = await query(findBusQuery, [plate.toUpperCase()]);
      return foundBus[0];
    } catch (error) {
      throw new Error('No Bus found');
    }
  }

  static async findBusById(id) {
    const findBusByIdQuery = 'SELECT * FROM buses WHERE bus_id = $1';
    try {
      const foundBus = await query(findBusByIdQuery, [id]);
      if (!foundBus[0]) { throw new Error('Bus not found'); }
      return foundBus[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Bus;
