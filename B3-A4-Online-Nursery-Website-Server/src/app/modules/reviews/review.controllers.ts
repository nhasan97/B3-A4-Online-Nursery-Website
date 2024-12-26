import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ReviewServices } from './review.services';

const postOverallReview = catchAsync(async (req, res) => {
  const response = await ReviewServices.postOverallReviewIntoDB(req.body);

  sendResponse(res, httpStatus.OK, true, 'Review Added Successfully', response);
});

const getOverallReviews = catchAsync(async (req, res) => {
  const response = await ReviewServices.getOverallReviewsFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Review retrieved successfully',
    response,
  );
});

export const ReviewControllers = {
  postOverallReview,
  getOverallReviews,
};
