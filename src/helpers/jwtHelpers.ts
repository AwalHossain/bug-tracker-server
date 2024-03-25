import jwt, { Secret } from 'jsonwebtoken';
import { JPayload } from '../interfaces/common';

type DecodeToken = {
  workspaceId: string;
  invitedById: string;
};

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const verifyToken = (token: string, secret: Secret): JPayload => {
  return jwt.verify(token, secret) as JPayload;
};

const decodeToken = (token: string): DecodeToken => {
  return jwt.decode(token) as DecodeToken;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
  decodeToken,
};
