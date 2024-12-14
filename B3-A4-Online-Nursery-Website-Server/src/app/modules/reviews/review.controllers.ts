import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ReviewServices } from './review.services';

const postReview = catchAsync(async (req, res) => {
  const response = await ReviewServices.postReviewIntoDB(req.body);

  sendResponse(res, httpStatus.OK, true, 'Review Added Successfully', response);
});

// const getRecipeReview = catchAsync(async (req, res) => {
//   const response = await ReviewServices.getRecipeReviewFromDB(
//     req.params.recipeID,
//     req?.query?.userId as string | undefined,
//   );

//   sendResponse(
//     res,
//     httpStatus.OK,
//     true,
//     'Review retrieved successfully',
//     response,
//   );
// });

export const ReviewControllers = {
  postReview,
  //   getRecipeReview,
};
