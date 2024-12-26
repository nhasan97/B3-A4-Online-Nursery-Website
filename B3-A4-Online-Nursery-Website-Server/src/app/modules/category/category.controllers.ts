import catchAsync from '../../utils/catchAsync';

import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { categoryServices } from './category.services';
/*

--------------controller for getting all categories data from DB----------------*/
const getAllCategories = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await categoryServices.getAllCategoriesFromDB(req?.query);

  //sending response
  if (response.length) {
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Categories retrieved successfully',
      response,
    );
  } else {
    sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  }
});
/*

--------------controller for getting categories count from DB----------------*/
const getCategoryCount = catchAsync(async (req, res) => {
  const response = await categoryServices.getCategoryCountFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

----------------controller for inserting new category data in DB----------------*/
const createCategory = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await categoryServices.createCategoryIntoDB(req.body);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category added successfully',
    response,
  );
});
/*

--------------controller for updating specific category info in DB----------------*/
const updateCategory = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await categoryServices.updateCategoryIntoDB(
    req.params.id,
    req.body,
  );

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category updated successfully',
    response,
  );
});
/*

--------------controller for updating specific category info in DB----------------*/
const deleteCategory = catchAsync(async (req, res) => {
  //Passing id to service function
  const response = await categoryServices.deleteCategoryFromDB(req.params.id);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Category deleted successfully',
    response,
  );
});

//exporting all the controller functions through categoryControllers object
export const categoryControllers = {
  getAllCategories,
  getCategoryCount,
  createCategory,
  updateCategory,
  deleteCategory,
};
