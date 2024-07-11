import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
/*

----------------controller for inserting new product data in DB----------------*/
const createProduct = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await productServices.createProductIntoDB(req.body);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Product added successfully',
    response,
  );
});
/*

--------------controller for getting all product data from DB----------------*/
const getAllProducts = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await productServices.getAllProductsFromDB();

  //sending response
  if (response.length) {
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Products retrieved successfully',
      response,
    );
  } else {
    sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  }
});
/*

--------------controller for updating specific product info in DB----------------*/
const deleteProduct = catchAsync(async (req, res) => {
  //Passing id to service function
  const response = await productServices.deleteProductFromDB(req.params.id);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Product deleted successfully',
    response,
  );
});

//exporting all the controller functions through productControllers object
export const productControllers = {
  createProduct,
  getAllProducts,
  deleteProduct,
};
