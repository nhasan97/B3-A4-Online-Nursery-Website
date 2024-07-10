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

//exporting all the controller functions through productControllers object
export const productControllers = {
  createProduct,
};
