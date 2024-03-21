import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { InvitationService } from './invitation.service';

const createInvitation = catchAsync(async (req: Request, res: Response) => {
  const createInvitation = await InvitationService.createInvitation(req);

  console.log('createInvitation', createInvitation);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Invitation Created Successfully',
    data: createInvitation,
  });
});

const checkInvitation = catchAsync(async (req: Request, res: Response) => {
  const result = await InvitationService.checkInvitation(req);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Workpac Details',
    data: result,
  });
});

export const InvitationController = {
  createInvitation,
  checkInvitation,
};
