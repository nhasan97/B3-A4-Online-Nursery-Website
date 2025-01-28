import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { orderControllers } from './order.controller';

const router = express.Router();

//------------route for getting all order data according to logged in user from DB------------
router.get('/get-all-orders/:userId', orderControllers.getAllOrders);

//------------route for getting all order count according to logged in user from DB------------
router.get('/get-all-orders-count/:userId', orderControllers.getAllOrdersCount);

//------------route for getting all order data according to status and logged in user from DB------------
router.get(
  '/get-orders-count-by-status/:userId',
  orderControllers.getOrderCountByStatus,
);

//------------route for getting specific order data from DB------------
router.get('/get-specific-order/:orderId', orderControllers.getSpecificOrder);

//------------route for getting total sales from DB------------
router.get('/get-total-sale', orderControllers.getTotalSale);

//------------route for inserting new order data in DB------------
router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  orderControllers.createOrder,
);

//------------route for updating order data in DB------------
router.patch(
  '/edit-order-status/:id',
  // auth(userRole.admin),
  orderControllers.updateOrderStatus,
);

//------------route for getting payment intent------------
router.post('/create-payment-intent', orderControllers.getPaymentIntent);

//exporting routes
export const orderRoutes = router;
