import { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import jwt from 'jsonwebtoken';
import { sendMail } from '../../utils/sendEmail';

// create
const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistByCustomIdOrEmail(payload.email);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }

  // checking password
  const isPasswordMatch = await User.isPasswordMatch(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect password');
  }

  // jwt token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );
  const libraryRefreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );
  return {
    accessToken,
    libraryRefreshToken,
  };
};

// change password
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistByCustomIdOrEmail(userData.email);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }

  // checking password
  const isPasswordMatch = await User.isPasswordMatch(payload.oldPassword, user?.password);

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Incorrect Old password');
  }

  // hashed password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = User.findOneAndUpdate(
    { email: userData.email, role: userData.role },
    {
      password: newHashedPassword,
      needPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

// refresh token
const libraryRefreshToken = async (token: string) => {
  // Check if the token exists
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  // Verify the token
  const decoded = jwt.verify(token, config.jwt_refresh_secret as string) as JwtPayload;

  // user role checking
  const { email } = decoded as JwtPayload;
  const user = await User.isUserExistByCustomIdOrEmail(email);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }



  // jwt token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

// forget password
const forgetPassword = async (email: string) => {
  // user  existence checking
  const user = await User.isUserExistByCustomIdOrEmail(email);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }

  // jwt token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, '10m');

  // reset ui link
  const resetUILink = `${config.reset_password_ui_link}/?email=${user.email}&token=${accessToken}`;

  sendMail(user.email, resetUILink);
};

// reset password
const resetPassword = async (payload: { email: string; newPassword: string }, token: string) => {
  // check user existence
  const user = await User.isUserExistByCustomIdOrEmail(payload.email);
  const isDeleted = user?.isDeleted;
  const isUserBlocked = user?.status === 'blocked';

  // user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is Not Found');
  }

  // check deleted
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
  }

  // check block
  if (isUserBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
  }

  // Verify the token
  const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

  // check if user email and token email match
  if (user.email !== decoded.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are Forbidden');
  }

  // hashed password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  const result = User.findOneAndUpdate(
    { email: decoded.email, role: decoded.role },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );

  return result;
};

export const AuthServices = {
  loginUser,
  changePassword,
  libraryRefreshToken,
  forgetPassword,
  resetPassword,
};
