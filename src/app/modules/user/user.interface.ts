import { User } from '@prisma/client';

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  user: User;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
