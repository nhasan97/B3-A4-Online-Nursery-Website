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

const postProductReview = catchAsync(async (req, res) => {
  const response = await ReviewServices.postProductReviewIntoDB(req.body);

  sendResponse(res, httpStatus.OK, true, 'Review Added Successfully', response);
});

const getProductReviews = catchAsync(async (req, res) => {
  const response = await ReviewServices.getProductReviewsFromDB(
    req?.params?.productId,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Review retrieved Successfully',
    response,
  );
});

export const ReviewControllers = {
  postOverallReview,
  getOverallReviews,
  postProductReview,
  getProductReviews,
};
