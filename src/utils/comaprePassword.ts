import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  console.log(password, 'password in comparePassword', hashedPassword);

  const isMatch = await bcrypt.compare(password, hashedPassword);
  console.log(isMatch, 'isMatch in comparePassword');

  if (!isMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
  }
  return isMatch;
};
