import express from 'express';
import Trip from '../controllers/trips';
import { validateTrip } from '../middlewares/inputValidation';
import { validateToken, checkAdmin } from '../middlewares/userVerification';

const router = express.Router();

router.post('/', [validateTrip, validateToken, checkAdmin], Trip.createTrip);


export default router;
