import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { productControllers } from './product.controllers';

const router = express.Router();

//------------route for inserting new product data in DB------------
router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  productControllers.createProduct,
);

//exporting routes
export const productRoutes = router;
