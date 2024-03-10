import { Request } from 'express';

import { User } from '@prisma/client';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { comparePassword } from '../../../utils/comaprePassword';
import { ILoginUserResponse } from './user.interface';

const loginUser = async (req: Request) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    throw new ApiError(400, 'Please Enter Email & Password');
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  console.log(user);
  // await Users.findOne({ email }).select('+password');

  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordMatched = await comparePassword(password, user.password);

  if (!isPasswordMatched) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    {
      id: user.id,
      role: user.role,
    },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const registerUser = async (req: Request): Promise<ILoginUserResponse> => {
  const { token, projectId } = req.query;

  console.log(token, projectId, 'cehc');

  // const checkInvitation = await inviteUser.findOne({
  //     token,
  //     expireToken: { $gt: Date.now() },
  // });

  const { name, email, password } = req.body;

  // Checking the if the user already approve or not yet regitered
  const user = await prisma.user.findFirst({
    where: {
      email,
      status: 'approve',
    },
  });

  //   findOne({ email, status: 'approve' });
  if (user) {
    throw new ApiError(500, 'User already exist ');
  }

  // Use try catch cause of async fn, to detect unnecessay bug easily
  try {
    if (!user) {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      // Push project Id into User
      // console.log(checkInvitation);
      const id = newUser.id;
      console.log(id, 'userId');
      // if (checkInvitation) {
      //     let updateUser = await User.updateOne(
      //         { email: newUser.email },

      //         {
      //             $push: {
      //                 projects: { projectId: projectId, role: role },
      //             },
      //         },
      //     );

      //     const updateProject = await Project.updateOne(
      //         {
      //             _id: projectId,
      //         },
      //         {
      //             $push: {
      //                 assignedPeople: { assignedUser: newUser._id, role: role },
      //             },
      //         },
      //     );
      //     console.log(updateProject, 'updaet project');
      // }

      const accessToken = jwtHelpers.createToken(
        {
          id: newUser.id,
          role: newUser.role,
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
      );
      const refreshToken = jwtHelpers.createToken(
        {
          id: newUser.id,
          role: newUser.role,
        },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
      );

      return {
        accessToken,
        refreshToken,
        user: newUser,
      };
    }
  } catch (err) {
    // if there is any error happened otp and expire date will be undefined
    console.log(err);
    throw new ApiError(500, 'Internal Server Error');
  }
  // Add this return statement to return a default value
  return {
    accessToken: '',
    refreshToken: '',
    user: {} as User,
  };
};

export const UserService = {
  loginUser,
  registerUser,
};