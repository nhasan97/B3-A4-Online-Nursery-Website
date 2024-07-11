import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { productControllers } from './product.controllers';

const router = express.Router();

//------------route for fetching all the product data from DB------------
router.get('/', productControllers.getAllProducts);

//------------route for inserting new product data in DB------------
router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  productControllers.createProduct,
);

//------------route for updating product data in DB------------
router.put(
  '/:id',
  validateRequest(ProductValidations.updateProductValidationSchema),
  productControllers.updateProduct,
);

//------------route for deleting specific product data from DB------------
router.delete('/:id', productControllers.deleteProduct);

//exporting routes
export const productRoutes = router;
