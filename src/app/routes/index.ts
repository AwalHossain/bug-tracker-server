import express from 'express';
import { InvitationRoutes } from '../modules/invitation/invitation.rotues';
import { UserRoutes } from '../modules/user/user.routes';
import { WorkspaceRoutes } from '../modules/workspace/workspace.rotues';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/workspace',
    route: WorkspaceRoutes,
  },
  {
    path: '/invitation',
    route: InvitationRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
