import { Router } from 'express';
import { WorkspaceController } from './invitation.controller';

const router = Router();

router.post('/create', WorkspaceController.createWorkspace);

router.get('/get-all', WorkspaceController.getAllWorkspace);

router.get('/get-one/:id', WorkspaceController.getOneWorkspace);

router.put('/update/:id', WorkspaceController.updateWorkspace);

router.delete('/delete/:id', WorkspaceController.deleteWorkspace);

export const WorkspaceRoutes = router;
