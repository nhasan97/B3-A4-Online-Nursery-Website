import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { productControllers } from './product.controllers';

const router = express.Router();

//------------route for fetching all the product data from DB------------
router.get('/get-all-products', productControllers.getAllProducts);

router.get('/get-all-products-count', productControllers.getProductCount);

router.get('/get-single-product/:id', productControllers.getSingleProduct);

router.get('/get-min-max-price', productControllers.getMinMaxProductPrice);

//------------route for inserting new product data in DB------------
router.post(
  '/create-product',
  validateRequest(ProductValidations.createProductValidationSchema),
  productControllers.createProduct,
);

//------------route for updating product data in DB------------
router.put(
  '/edit-product/:id',
  validateRequest(ProductValidations.updateProductValidationSchema),
  productControllers.updateProduct,
);

//------------route for deleting specific product data from DB------------
router.delete('/delete-product/:id', productControllers.deleteProduct);

//exporting routes
export const productRoutes = router;
