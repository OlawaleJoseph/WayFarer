import Helper from '../utils/bookings.utils';
import Trip from '../utils/trips.utils';
import { verifyUser } from '../utils/common';

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

  static async findABooking(req, res) {
    try {
      const foundBooking = await Helper.findABooking(req.params.bookingId);
      try {
        verifyUser(req.user, foundBooking.user_id);
      } catch (error) {
        return res.status(403).json({
          status: 'error',
          message: error.message,
        });
      }
      return res.status(200).json({
        status: 'success',
        data: foundBooking,
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async findAllBookings(req, res) {
    try {
      let allBookings = await Helper.findAllBookings(req.user);

      allBookings = allBookings.map((booking) => {
        const {
          password, trip_completed, status, created_on, date_registered, is_admin, ...bookingObj
        } = booking;
        return bookingObj;
      });

      return res.status(200).json({
        status: 'success',
        data: allBookings,
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  static async deleteBooking(req, res) {
    try {
      const booking = await Helper.deleteBooking(req.params.bookingId, req.user);

      if (!booking) {
        return res.status(404).json({
          status: 'error',
          message: 'Booking not found',
        });
      }
      return res.status(204).json({
        status: 'success',
        data: {},
      });
    } catch (error) {
      return res.status(403).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}

export default Bookings;
