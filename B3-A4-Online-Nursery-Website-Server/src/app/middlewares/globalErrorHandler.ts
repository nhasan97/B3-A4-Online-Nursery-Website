import { ErrorRequestHandler } from 'express';
import { sendResponse } from '../utils/sendResponse';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
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
