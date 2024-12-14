import { TReview } from './review.interface';
import { Review } from './review.model';

/*

----------------service function for inserting review data in DB----------------*/
const postReviewIntoDB = async (reviewData: TReview) => {
  const response = await Review.create(reviewData);

  return response;
};

export const ReviewServices = {
  postReviewIntoDB,
  //   getRecipeReviewFromDB,
};
