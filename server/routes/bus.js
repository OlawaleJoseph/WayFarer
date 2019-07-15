import express from 'express';
import Bus from '../controllers/bus';
import { validateToken, checkAdmin } from '../middlewares/userVerification';
import { validateBus } from '../middlewares/inputValidation';

const router = express.Router();

router.post('/', [validateToken, validateBus, checkAdmin], Bus.createBus);


export default router;
