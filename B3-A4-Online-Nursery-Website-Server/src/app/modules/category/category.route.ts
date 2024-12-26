import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { categoryControllers } from './category.controllers';

const router = express.Router();

//------------route for fetching all the category data from DB------------
router.get('/get-all-categories', categoryControllers.getAllCategories);

//------------route for fetching category count from DB------------
router.get('/get-all-categories-count', categoryControllers.getCategoryCount);

//------------route for inserting new category data in DB------------
router.post(
  '/create-category',
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  categoryControllers.createCategory,
);

//------------route for updating category data in DB------------
router.put(
  '/edit-catgory/:id',
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  categoryControllers.updateCategory,
);

//------------route for deleting specific category data from DB------------
router.delete('/delete-catgory/:id', categoryControllers.deleteCategory);

//exporting routes
export const categoryRoutes = router;
