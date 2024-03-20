import { Request, Response } from 'express';
import sendResponse from '../../../shared/sendResponse';
import { WorkspaceService } from './invitation.services';

const createWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.createWorkspace(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Workpac Created Successfully',
    data: result,
  });
};

const updateWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.updateWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Updated Successfully',
    data: result,
  });
};

const getOneWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.getOneWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Details',
    data: result,
  });
};

const deleteWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.deleteWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Deleted Successfully',
    data: result,
  });
};

const getAllWorkspace = async (req: Request, res: Response) => {
  const result = await WorkspaceService.getAllWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Details',
    data: result,
  });
};

export const WorkspaceController = {
  createWorkspace,
  updateWorkspace,
  getOneWorkspace,
  deleteWorkspace,
  getAllWorkspace,
};
