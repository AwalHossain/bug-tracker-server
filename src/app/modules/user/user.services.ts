import { Request } from 'express';

import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { comparePassword } from '../../../utils/comaprePassword';
import { addUserToWorkspace, createUser } from '../../services/auth.service';
import { ILoginUserResponse, IRefreshTokenResponse } from './user.interface';

const loginUser = async (req: Request) => {
  const { email, password, token } = req.body;
  const { invitedById, workspaceId } = jwtHelpers.decodeToken(token) || {};

  // checking if user has given password and email both
  if (!email || !password) {
    throw new ApiError(400, 'Please Enter Email & Password');
  }

  let user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      createdWorkspaces: true,
    },
  });

  console.log('user checking in', user?.email, user?.password);

  if (!user) {
    console.log('Inside auth', user);
    throw new ApiError(401, 'Invalid email');
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    console.log(isPasswordMatched, 'isPasswordMatched');
    throw new ApiError(401, 'Invalid email or password no valid');
  }

  const checkWorkspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: user?.id,
        },
      },
    },
  });

  console.log(checkWorkspace, 'checkWorkspace');

  // check if it has valid token and workspaceId, if so then join this user in the Workspace
  if (token && user && !checkWorkspace) {
    await prisma.$transaction(async tx => {
      const workspaceData = {
        id: workspaceId,
        userId: user!.id,
        invitedById,
      };

      await addUserToWorkspace({ tx, workspaceData });
    });
  }

  user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      createdWorkspaces: true,
      workspaceMembers: {
        include: {
          workspace: true,
        },
      },
    },
  });

  const accessToken = jwtHelpers.createToken(
    {
      id: user?.id,
      role: user?.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id: user?.id,
      role: user?.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    ...user,
  };
};

const registerUser = async (req: Request): Promise<ILoginUserResponse> => {
  const { name, email, password, token } = req.body;
  const { invitedById, workspaceId } = jwtHelpers.decodeToken(token) || {};

  console.log(password, 'password in registerUser');

  // Checking the if the user already approve or not yet regitered
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const saltRounds = Number(config.bycrypt_salt_rounds);
  const hashPass = await bcrypt.hash(password, saltRounds);
  console.log(user, 'user checking from regis');

  if (user) {
    throw new ApiError(500, 'User already exist ');
  }
  const userData = {
    name,
    email,
    password: hashPass,
  };
  // Use try catch cause of async fn, to detect unnecessay bug easily

  if (!user) {
    let newUser;
    // Push project Id into User
    // console.log(checkInvitation);

    const checkWorkspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
      },
    });

    // check if it has valid token and workspaceId, if so then join this user in the Workspace
    if (checkWorkspace && token) {
      await prisma.$transaction(async tx => {
        newUser = await createUser({ tx, userData });

        console.log('New user checking ', newUser);

        const workspaceData = {
          id: workspaceId,
          userId: newUser.id,
          invitedById,
        };

        await addUserToWorkspace({ tx, workspaceData });
      });
    } else {
      newUser = await prisma.user.create({
        data: userData,
        include: {
          createdWorkspaces: true,
          workspaceMembers: {
            include: {
              workspace: true,
            },
          },
        },
      });
    }

    const nUser = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        createdWorkspaces: true,
        workspaceMembers: {
          include: {
            workspace: true,
          },
        },
      },
    });

    const accessToken = jwtHelpers.createToken(
      {
        id: nUser?.id,
        role: nUser?.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    const refreshToken = jwtHelpers.createToken(
      {
        id: nUser?.id,
        role: nUser?.role,
      },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken,
      ...nUser,
    };
  }

  // Add this return statement to return a default value
  return {
    accessToken: '',
    refreshToken: '',
    user: {} as User,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // verify refresh token

  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(401, 'Invalid or Expired Refresh Token');
  }

  const { id, role } = verifyToken;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(401, 'User not found');
  }

  // create new access token
  const accessToken = jwtHelpers.createToken(
    {
      id,
      role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
  };
};

const getUser = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};

export const UserService = {
  loginUser,
  registerUser,
  refreshToken,
  getUser,
};
