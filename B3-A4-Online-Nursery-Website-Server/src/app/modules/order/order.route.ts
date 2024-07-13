import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidations } from './order.validation';
import { orderControllers } from './order.controller';

const router = express.Router();

//------------route for inserting new order data in DB------------
router.post(
  '/',
  validateRequest(OrderValidations.createOrderValidationSchema),
  orderControllers.createOrder,
);

//exporting routes
export const orderRoutes = router;
