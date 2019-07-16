import Helper from '../utils/bookings.utils';
import Trip from '../utils/trips.utils';

class Bookings {
  static async createBooking(req, res) {
    try {
      const tripToBook = await Trip.findTrip(parseInt(req.body.trip_id, 10));
      if (tripToBook.status !== 'active') {
        return res.status(422).json({
          status: 'error',
          message: 'This Trip has been cancelled',
        });
      }
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
    try {
      const booking = await Helper.createBooking(req.body, req.user.userId);
      const savedBooking = await Helper.findABooking(booking.booking_id);
      return res.status(201).json({
        status: 'success',
        data: savedBooking,
      });
    } catch (error) {
      return res.status(422).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default Bookings;
