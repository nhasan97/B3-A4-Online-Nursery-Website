import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userServices } from './user.service';

/*

--------------------------controller for getting the user--------------------------*/
const getAllUsers = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await userServices.getAllUsersFromDB(req?.query);

  //sending response

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Users retrieved successfully',
    response,
  );
});
/*

--------------------------controller for getting all users count--------------------------*/
const getAllUsersCount = catchAsync(async (req, res) => {
  const response = await userServices.getAllUsersCountFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

--------------------------controller for getting the user--------------------------*/
const getUser = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await userServices.getUserFromDB(req.params.id);

  //sending response

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User retrieved successfully',
    response,
  );
});
/*

--------------------------controller for updating the user info--------------------------*/
const updateLoggedInUserInfo = catchAsync(async (req, res) => {
  const response = await userServices.updateLoggedInUserInfoInDB(
    req?.params?.userId,
    req?.body,
  );

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'User info updated successfully',
    response,
  );
});

export const userControllers = {
  getAllUsers,
  getAllUsersCount,
  getUser,
  updateLoggedInUserInfo,
};
