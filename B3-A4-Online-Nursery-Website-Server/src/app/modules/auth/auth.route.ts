import express from 'express';
import { authControllers } from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { authValidations } from './auth.validation';

const router = express.Router();

//------------route for user signup and saving user data in DB------------
router.post(
  '/signup',
  validateRequest(authValidations.userSignupValidationSchema),
  authControllers.userSignup,
);

//------------route for user login------------
router.post(
  '/login',
  validateRequest(authValidations.userLoginValidationSchema),
  authControllers.userLogin,
);

//------------route for refresh token------------
router.post(
  '/refreshToken',
  validateRequest(authValidations.refreshTokenValidationSchema),
  authControllers.refreshToken,
);

export const authRoutes = router;
