import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error) {
    sendResponse(
      res,
      error.statusCode || 500,
      false,
      error.message || 'Something went wrong',
    );
  }
};

export default globalErrorHandler;
