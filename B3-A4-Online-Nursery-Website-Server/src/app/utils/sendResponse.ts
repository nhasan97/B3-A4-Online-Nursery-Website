import { Response } from 'express';

// ----------------function for formatting and sending response to client----------------
export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  operationalStatus: boolean,
  message: string = 'Something went wrong!',
  toSend?: T,
  token?: string,
) => {
  res.status(statusCode).json({
    success: operationalStatus,
    statusCode: statusCode,
    message: message,
    token: token,
    data: toSend,
  });
};
