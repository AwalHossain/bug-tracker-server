import { PrismaTransactionalClient } from '../../interfaces/common';
import prisma from '../../shared/prisma';

type UserProps = {
  tx: PrismaTransactionalClient;
  userData: {
    name: string;
    email: string;
    password: string;
  };
};

type WorkspaceProps = {
  tx: PrismaTransactionalClient;
  workspaceData: {
    id: string;
    userId: string;
    invitedById: string;
  };
};

export const createUser = async ({ tx, userData }: UserProps) => {
  const { name, email, password } = userData;

  return await tx.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};

export const addUserToWorkspace = async ({
  tx,
  workspaceData,
}: WorkspaceProps) => {
  const { id: workspaceId, userId, invitedById } = workspaceData;
  console.log('checkInvitation', invitedById);
  const checkInvitation = await prisma.invitation.findFirst({
    where: {
      workspaceId,
      invitedById,
      status: 'PENDING',
    },
  });

  console.log(checkInvitation, 'checkInvitation');

  if (!checkInvitation) {
    throw new Error('Invalid invitation link');
  }

  await tx.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      members: {
        connectOrCreate: {
          where: {
            id: workspaceId,
            userId: userId,
          },
          create: {
            userId: userId,
            role: 'MEMBER',
          },
        },
      },
    },
  });

  // update invitation status
  const invitation = await tx.invitation.update({
    where: {
      id: checkInvitation.id,
    },
    data: {
      acceptedAt: new Date(),
      status: 'ACCEPTED',
    },
  });
  console.log('invitation', invitation);
};
