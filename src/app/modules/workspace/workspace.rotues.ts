import { Router } from 'express';
import { InvitationController } from './workspace.controller';

const router = Router();

router.post('/create', InvitationController.createInvitation);

export const WorkspaceRoutes = router;
