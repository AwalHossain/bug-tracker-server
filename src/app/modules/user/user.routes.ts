import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = Router();

router.post(
  '/create',
  validateRequest(UserValidation.loginRegistrationZodSchema),
  UserController.registerUser
);
router.post(
  '/login',
  validateRequest(UserValidation.loginRegistrationZodSchema),
  UserController.loginUser
);

router.post(
  '/refresh-token',
  validateRequest(UserValidation.refreshTokenZodSchema),
  UserController.refreshToken
);

router.get('/check', auth(ENUM_USER_ROLE.ADMIN));

router.get(
  '/me',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.MEMBER),
  UserController.getUser
);

export const UserRoutes = router;
