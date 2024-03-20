import { Request } from 'express';
import prisma from '../../../shared/prisma';

const createWorkspace = async (req: Request) => {
  const result = await prisma.workspace.create({
    data: {
      name: req.body.name,
      createdBy: {
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
  });

  return result;
};

const getOneWorkspace = async (req: Request) => {
  const result = await prisma.workspace.findUnique({
    where: {
      id: req.params.id,
    },
  });

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
};
