import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { sendResponse } from '../utils/sendResponse';

const notFound: RequestHandler = (req, res, next) => {
  sendResponse(res, httpStatus.NOT_FOUND, false, 'Not Found');
};

export default notFound;
