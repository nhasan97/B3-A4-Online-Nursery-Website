import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { orderControllers } from './order.controller';

const router = express.Router();

router.get('/get-all-orders', orderControllers.getAllOrders);

//------------route for inserting new order data in DB------------
router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  orderControllers.createOrder,
);

router.patch(
  'edit-order-status/:id',
  // auth(USER_ROLE.ADMIN),
  orderControllers.updateOrderStatus,
);

router.post('/create-payment-intent', orderControllers.getPaymentIntent);
//exporting routes
export const orderRoutes = router;
