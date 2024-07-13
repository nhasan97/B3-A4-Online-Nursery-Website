import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { orderServices } from './order.service';

/*

----------------controller for inserting new order data in DB----------------*/
const createOrder = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await orderServices.createOrderIntoDB(req.body);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Order added successfully', response);
});

//exporting all the controller functions through orderControllers object
export const orderControllers = {
  createOrder,
};
