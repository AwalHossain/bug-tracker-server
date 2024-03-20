import { Request, Response } from 'express';
import { generateInvitationLink } from '../../../helpers/generateInvitationlink';
import sendResponse from '../../../shared/sendResponse';

const createInvitation = async (req: Request, res: Response) => {
  const baseUrl = req.protocol + '://' + req.get('host');
  const workspaceId = req.body.workspaceId;
  const email = req.body.email.split(',');
  const invitedById = req.user.id;
  let result;
  for (let i = 0; i < email.length; i++) {
    result = generateInvitationLink({
      baseUrl,
      email: email[i],
      workspaceId,
      invitedById,
    });
  }

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Workpac Created Successfully',
    data: result,
  });
};

export const InvitationController = {
  createInvitation,
};
