import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewValidation } from './review.validation';
import { ReviewControllers } from './review.controllers';

const router = express.Router();

router.get('/get-overall-review', ReviewControllers.getOverallReviews);

router.post(
  '/post-overall-review',
  validateRequest(ReviewValidation.postReviewValidationSchema),
  ReviewControllers.postOverallReview,
);

export const reviewRoutes = router;
