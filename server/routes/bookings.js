import express from 'express';
import Booking from '../controllers/bookings';
import { validateBooking } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userVerification';

const router = express();


router.post('/', [validateToken, validateBooking], Booking.createBooking);


export default router;
