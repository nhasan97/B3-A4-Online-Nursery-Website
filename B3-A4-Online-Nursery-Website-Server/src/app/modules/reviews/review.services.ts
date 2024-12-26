import { REVIEW_TYPE } from './review.contants';
import { TReview } from './review.interface';
import { Review } from './review.model';

/*

----------------service function for inserting review data in DB----------------*/
const postOverallReviewIntoDB = async (reviewData: TReview) => {
  const response = await Review.create(reviewData);

  return response;
};

const getOverallReviewsFromDB = async () => {
  const response = await Review.find({
    isDeleted: { $ne: true },
    type: REVIEW_TYPE.Overall,
  }).populate('user');

  return response;
};

export const ReviewServices = {
  postOverallReviewIntoDB,
  getOverallReviewsFromDB,
};
