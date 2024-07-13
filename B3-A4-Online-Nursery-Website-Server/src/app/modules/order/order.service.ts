import { TOrder } from './order.interface';
import { orderModel } from './order.model';

/*

----------------service function for inserting Order data in DB----------------*/
const createOrderIntoDB = async (orderData: TOrder) => {
  console.log(orderData);
  const response = await orderModel.create(orderData);
  return response;
};

//exporting all the service functions through orderServices object
export const orderServices = {
  createOrderIntoDB,
};
