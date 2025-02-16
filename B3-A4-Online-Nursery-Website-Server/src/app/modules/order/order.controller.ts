import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { orderServices } from './order.service';
/*

----------------controller for getting all orders from DB----------------*/
const getAllOrders = catchAsync(async (req, res) => {
  const response = await orderServices.getAllOrdersFromDB(
    req?.params?.userId,
    req?.query,
  );

  //sending response
  if (response.length) {
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'orders retrieved successfully',
      response,
    );
  } else {
    sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  }
});
/*

--------------------------controller for getting all orders count--------------------------*/
const getAllOrdersCount = catchAsync(async (req, res) => {
  const response = await orderServices.getAllOrdersCountFromDB(
    req?.params?.userId,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

--------------------------controller for getting all orders count--------------------------*/
const getOrderCountByStatus = catchAsync(async (req, res) => {
  const response = await orderServices.getOrderCountByStatusFromDB(
    req?.params?.userId,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

--------------------------controller for getting specific order data--------------------------*/
const getSpecificOrder = catchAsync(async (req, res) => {
  const response = await orderServices.getSpecificOrderFromDB(
    req?.params?.orderId,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'order retrieved successfully',
    response,
  );
});
/*

--------------------------controller for getting total sales--------------------------*/
const getTotalSale = catchAsync(async (req, res) => {
  const response = await orderServices.getTotalSalesFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

----------------controller for inserting new order data in DB----------------*/
const createOrder = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await orderServices.createOrderIntoDB(req.body);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Order added successfully', response);
});

const getPaymentIntent = catchAsync(async (req, res) => {
  const { price } = req.body;

  const response = await orderServices.getPaymentIntentFromStirpe(price);

  //sending response
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Payment intent generated successfully',
    response,
  );
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const order = await orderServices.updateOrderStatusIntoDB(
    req?.params?.id,
    req?.body?.status as string,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'order status changed Successfully',
    order,
  );
});

//exporting all the controller functions through orderControllers object
export const orderControllers = {
  getAllOrders,
  getAllOrdersCount,
  getOrderCountByStatus,
  getSpecificOrder,
  getTotalSale,
  createOrder,
  getPaymentIntent,
  updateOrderStatus,
};
