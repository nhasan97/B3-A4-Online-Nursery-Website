import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../Errors/AppError';
import { userRole } from '../modules/user/user.constant';
import { verifyToken } from '../utils/verifyJWT';
import { userModel } from '../modules/user/user.model';

const auth = (...requiredRoles: (keyof typeof userRole)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    // checking if the user is exist
    const user = await userModel.doesUserExist(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is already deleted

    // const status = user?.status;

    // if (status === 'BLOCKED') {
    //   throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    // }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number
    //   )
    // ) {
    //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
