import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { WorkspaceService } from './workspace.services';

const createWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.createWorkspace(req);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Workpac Created Successfully',
    data: result,
  });
});

const updateWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.updateWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Updated Successfully',
    data: result,
  });
});

const getOneWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.getOneWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Details',
    data: result,
  });
});

const joinWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.joinWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Joined Successfully',
    data: result,
  });
});

const deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.deleteWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Deleted Successfully',
    data: result,
  });
});

const getAllWorkspace = catchAsync(async (req: Request, res: Response) => {
  const result = await WorkspaceService.getAllWorkspace(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Details',
    data: result,
  });
});

export const WorkspaceController = {
  createWorkspace,
  updateWorkspace,
  getOneWorkspace,
  deleteWorkspace,
  getAllWorkspace,
  joinWorkspace,
};
