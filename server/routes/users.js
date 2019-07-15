import express from 'express';
import User from '../controllers/users';
import { validateSignUp, validateLogin } from '../middlewares/inputValidation';

const router = express.Router();

router.post('/signup', validateSignUp, User.create);
router.post('/signin', validateLogin, User.login);


export default router;
