import { JwtPayload } from 'jsonwebtoken';
import prisma from '../shared/prisma';
import { IGenericErrorMessage } from './error';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type JPayload = {
  id: string;
  role: string;
} & JwtPayload;

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type PrismaTransactionalClient = Omit<
  typeof prisma,
  '$extends' | '$transaction' | '$disconnect' | '$connect' | '$on' | '$use'
>;
