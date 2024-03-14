import { Request, Response } from 'express';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  console.log('loginUser', req.body);

  const result = await UserService.loginUser(req);

  const { refreshToken, ...data } = result;
  // set refresh token into cookie
  const cookieOptions: {
    secure: boolean;
    httpOnly: boolean;
    maxAge: number;
    sameSite: 'lax' | 'strict' | 'none' | undefined;
  } = {
    secure: config.env === 'production',
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    sameSite: 'lax',
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

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await UserService.refreshToken(refreshToken);

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Token Refreshed Successfully',
    data: result,
  });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id as string;
  console.log('userId', userId);

  if (!userId) {
    throw new ApiError(401, 'Unauthorized');
  }

  const user = await UserService.getUser(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User Details',
    data: user,
  });
});

export const UserController = {
  loginUser,
  registerUser,
  refreshToken,
  getUser,
};
