import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { InvitationController } from './invitation.controller';

const router = Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  InvitationController.createInvitation
);

router.get('/check/teamInvitation', InvitationController.checkInvitation);

export const InvitationRoutes = router;
