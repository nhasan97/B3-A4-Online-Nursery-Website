import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { authServices } from './auth.services';
import config from '../../config';

/*

----------------controller for inserting new user data in DB----------------*/
const userSignup = catchAsync(async (req, res) => {
  //sending data to service function
  const response = await authServices.saveUserIntoDB(req.body);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User registered successfully',
    response,
  );
});
/*

--------------------------controller for user login--------------------------*/
const userLogin = catchAsync(async (req, res) => {
  //destructuring necessary properties from result sent by service function
  const { user, accessToken, refreshToken } = await authServices.loginUser(
    req.body,
  );
  const { id, name, email, role, phone, address } = user;

  //setting refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User logged in successfully',
    { _id: id, name, email, role, phone, address },
    accessToken,
  );
});
/*

--------------------------controller for refresh token--------------------------*/
const refreshToken = catchAsync(async (req, res) => {
  //destructuring refresh token from cookies
  const { refreshToken } = req.cookies;

  //sending refresh token to service function
  const response = await authServices.refreshToken(refreshToken);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Access token generated successfully',
    response,
  );
});
/*

--------------------------controller for getting the user--------------------------*/
const getUser = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await authServices.getUserFromDB(req.params.id);

  //sending response

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User retrieved successfully',
    response,
  );
});

//exporting all the controller functions through authControllers object
export const authControllers = {
  userSignup,
  userLogin,
  refreshToken,
  getUser,
};
