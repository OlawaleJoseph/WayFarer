import express from 'express';
import User from '../controllers/users';
import { validateSignUp } from '../middlewares/inputValidation';

const router = express.Router();

router.post('/signup', validateSignUp, User.create);


export default router;
