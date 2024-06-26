import { Request } from 'express';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { generateInvitationLink } from '../../../helpers/generateInvitationlink';
import sendMail from '../../../helpers/sendMail';
import prisma from '../../../shared/prisma';

const createInvitation = async (req: Request) => {
  const baseUrl = `${config.client_url}/invitation`;
  const workspaceId = req.body.workspaceId;
  const emailList = req.body.email.split(/[ ,]+/);
  const invitedById = req.user.id;
  const result = [];

  for (const email of emailList) {
    const invitation = await prisma.invitation.create({
      data: {
        workspaceId: workspaceId.toString(),
        email: email,
        invitedById: invitedById,
      },
    });

    const send = generateInvitationLink({
      baseUrl,
      email,
      workspaceId,
      invitedById,
    });

    await sendMail(email, 'Invitation to join workspace');

    result.push({ invitation, send });
  }
  return result;
};

const checkInvitation = async (req: Request) => {
  const { workspaceId, email, token } = req.query;
  console.log('workspaceId', workspaceId, 'email', email, 'token', token);

  if (!workspaceId || !email || !token) {
    throw new Error('Invalid invitation link');
  }

  //   first check if user is already signed up
  const user = await prisma.user.findFirst({
    where: {
      email: email.toString(),
    },
  });

  //   if user not signed up, then sign them up and add them to the workspace

  if (!user) {
    throw new ApiError(401, 'User not signed up');
  }

  console.log(user, 'check invitation');

  const workspace = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId: workspaceId.toString(),
      user: {
        email: email.toString(),
      },
    },
    include: {
      user: true,
    },
  });

  console.log(workspace, 'check workspace');

  if (workspace) {
    throw new ApiError(200, 'User already in the workspace');
  }

  // If the user is not already signed up , add them to the workspace

  if (user && !workspace) {
    const newWorkspaceMember = await prisma.workspaceMember.create({
      data: {
        workspaceId: workspaceId.toString(),
        userId: user.id,
        role: 'MEMBER',
      },
    });

    // Fetch the invitation by email
    const invitation = await prisma.invitation.findFirst({
      where: {
        email: email.toString(),
      },
    });

    // Check if invitation exists
    if (!invitation) {
      throw new Error('Invitation not found');
    }

    // Update the invitation
    await prisma.invitation.update({
      where: {
        id: invitation.id,
      },
      data: {
        acceptedAt: new Date(),
        status: 'ACCEPTED',
      },
    });

    return newWorkspaceMember;
  }
};
export const InvitationService = {
  checkInvitation,
  createInvitation,
};
