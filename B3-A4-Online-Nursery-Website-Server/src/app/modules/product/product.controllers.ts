import catchAsync from '../../utils/catchAsync';
import { productServices } from './product.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
/*

--------------controller for getting all product data from DB----------------*/
const getAllProducts = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await productServices.getAllProductsFromDB(req?.query);

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

const getSingleProduct = catchAsync(async (req, res) => {
  const response = await productServices.getSingleProductFromDB(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Department fetched successfully!',
    response,
  );
});

const getProductCount = catchAsync(async (req, res) => {
  const response = await productServices.getProductCountFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Department fetched successfully!',
    response,
  );
});

const getMinMaxProductPrice = catchAsync(async (req, res) => {
  const response = await productServices.getMinMaxProductPriceFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});

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

--------------controller for updating specific product info in DB----------------*/
const updateProduct = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await productServices.updateProductIntoDB(
    req.params.id,
    req.body,
  );

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Product updated successfully',
    response,
  );
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
  getAllProducts,
  getSingleProduct,
  getProductCount,
  getMinMaxProductPrice,
  createProduct,
  updateProduct,
  deleteProduct,
};
