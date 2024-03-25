import { Router } from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { WorkspaceController } from './workspace.controller';

const router = Router();

router.post(
  '/create',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.createWorkspace
);

router.get(
  '/get-all',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.getAllWorkspace
);

router.get(
  '/get-one/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.getOneWorkspace
);

router.put(
  '/update/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.updateWorkspace
);

router.delete(
  '/delete/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.deleteWorkspace
);

router.put(
  '/join/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  WorkspaceController.joinWorkspace
);

export const WorkspaceRoutes = router;
