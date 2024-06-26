import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const createWorkspace = async (req: Request) => {
  console.log(req.body, 'req.user.id', req.user.id);

  const result = await prisma.workspace.create({
    data: {
      name: req.body.name,
      createdBy: {
        connect: {
          id: req.user.id,
        },
      },
      members: {
        connectOrCreate: {
          where: {
            id: req.user.id,
          },
          create: {
            role: 'ADMIN',
            user: {
              connect: {
                id: req.user.id,
              },
            },
          },
        },
      },
    },
    include: {
      members: true,
    },
  });

  return result;
};

const joinWorkspace = async (req: Request) => {
  const result = await prisma.workspace.update({
    where: {
      id: req.params.id,
    },
    data: {
      members: {
        connect: {
          id: req.user.id,
        },
      },
    },
  });

  return result;
};

const getAllWorkspace = async (req: Request) => {
  const result = await prisma.workspace.findMany({
    where: {
      createdBy: {
        id: req.user.id,
      },
    },
    include: {
      createdBy: true,
      Invitation: true,
      members: true,
    },
  });

  return result;
};

const getOneWorkspace = async (req: Request) => {
  const result = await prisma.workspace.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      members: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Workspace not found');
  }

  return result;
};

const updateWorkspace = async (req: Request) => {
  const result = await prisma.workspace.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });

  return result;
};

const deleteWorkspace = async (req: Request) => {
  const result = await prisma.workspace.delete({
    where: {
      id: req.params.id,
    },
  });

  return result;
};

export const WorkspaceService = {
  createWorkspace,
  getAllWorkspace,
  getOneWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace,
};
