import { User } from '@prisma/client';

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: User;
  newUser?: User;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
