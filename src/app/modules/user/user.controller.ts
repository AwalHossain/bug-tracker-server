import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.loginUser(req);

  const { refreshToken } = result;
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
    data: result,
  });
});

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.registerUser(req);

  const { refreshToken } = result;
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
    data: result,
  });
});

export const UserController = {
  loginUser,
  registerUser,
};
