import express from 'express';
import Bus from '../controllers/bus';
import { validateToken, checkAdmin } from '../middlewares/userVerification';
import { validateBus, validateParam } from '../middlewares/inputValidation';

const router = express.Router();

router.post('/', [validateBus, validateToken, checkAdmin], Bus.createBus);
router.get('/:busId', [validateParam, validateToken, checkAdmin], Bus.findABus);
router.get('/', [validateToken, checkAdmin], Bus.findAllBuses);


export default router;
