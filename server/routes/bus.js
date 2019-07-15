import express from 'express';
import Bus from '../controllers/bus';
import { validateToken, checkAdmin } from '../middlewares/userVerification';
import { validateBus, validateParam } from '../middlewares/inputValidation';

const router = express.Router();

router.post('/', [validateToken, validateBus, checkAdmin], Bus.createBus);
router.get('/:busId', [validateParam, validateToken, checkAdmin], Bus.findABus);


export default router;