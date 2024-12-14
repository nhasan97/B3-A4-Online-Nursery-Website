import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.post(
  '/post-review',
  validateRequest(ReviewValidation.postReviewValidationSchema),
  ReviewControllers.postReview,
);

router.get('/:recipeID', ReviewControllers.getRecipeReview);

export const ReviewRoutes = router;
