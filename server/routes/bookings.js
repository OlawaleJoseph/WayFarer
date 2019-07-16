import express from 'express';
import Booking from '../controllers/bookings';
import { validateBooking, validateParam } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userVerification';

const router = express();


router.post('/', [validateBooking, validateToken, validateBooking], Booking.createBooking);
router.get('/:bookingId', [validateParam, validateToken], Booking.findABooking);
router.get('/', validateToken, Booking.findAllBookings);
router.patch('/:bookingId', [validateParam, validateToken], Booking.updateSeat);
router.delete('/:bookingId', [validateParam, validateToken], Booking.deleteBooking);

export default router;
