import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { orderControllers } from './order.controller';
// import auth from '../../middlewares/auth';
// import { userRole } from '../user/user.constant';

const router = express.Router();

router.get('/get-all-orders', orderControllers.getAllOrders);

router.get('/get-all-orders-count', orderControllers.getAllOrdersCount);

router.get(
  '/get-orders-count-by-status',
  orderControllers.getOrderCountByStatus,
);

router.get(
  '/get-loggedIn-Users-orders/:loggedInUserEmail',
  orderControllers.getLoggedInUsersOrders,
);

router.get(
  '/get-loggedIn-Users-orders-count/:loggedInUserEmail',
  orderControllers.getLoggedInUsersOrdersCount,
);

router.get('/get-total-sale', orderControllers.getTotalSale);

//------------route for inserting new order data in DB------------
router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  orderControllers.createOrder,
);

router.patch(
  '/edit-order-status/:id',
  // auth(userRole.admin),
  orderControllers.updateOrderStatus,
);

router.post('/create-payment-intent', orderControllers.getPaymentIntent);

//exporting routes
export const orderRoutes = router;
