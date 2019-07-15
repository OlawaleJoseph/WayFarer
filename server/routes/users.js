import express from 'express';
import User from '../controllers/users';
import { validateSignUp, validateLogin, validateParam } from '../middlewares/inputValidation';
import { validateToken } from '../middlewares/userVerification';

const router = express.Router();

router.post('/signup', validateSignUp, User.create);
router.post('/signin', validateLogin, User.login);
router.get('/users/:userId', [validateParam, validateToken], User.findUser);


export default router;
