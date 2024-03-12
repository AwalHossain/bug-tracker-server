import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log('loginUser', req.body);

  const result = await UserService.loginUser(req);

  const { refreshToken, ...data } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Logged In Successfully',
    data: data,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.registerUser(req);

  const { refreshToken, ...data } = result;
  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User Registered Successfully',
    data: data,
  });
});

export const UserController = {
  loginUser,
  registerUser,
};
