import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  return isMatch;
};
