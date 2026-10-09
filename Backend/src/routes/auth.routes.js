import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controller.js';
import {
  loginValidationRules,
  registerValidationRules,
  validateRequest,
} from '../validator/auth.validator.js';

const authRouter = Router();

authRouter.post('/register', registerValidationRules, validateRequest, registerUser);
authRouter.post('/login', loginValidationRules, validateRequest, loginUser);

export default authRouter;
