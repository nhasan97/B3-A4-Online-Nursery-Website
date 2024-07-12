import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { categoryControllers } from './category.controllers';

const router = express.Router();

//------------route for fetching all the category data from DB------------
router.get('/', categoryControllers.getAllCategories);

//------------route for inserting new category data in DB------------
router.post(
  '/',
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  categoryControllers.createCategory,
);

//------------route for updating category data in DB------------
router.put(
  '/:id',
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  categoryControllers.updateCategory,
);

//------------route for deleting specific category data from DB------------
router.delete('/:id', categoryControllers.deleteCategory);

//exporting routes
export const categoryRoutes = router;
