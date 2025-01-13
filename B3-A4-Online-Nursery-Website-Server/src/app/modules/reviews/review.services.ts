/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { REVIEW_TYPE } from './review.contants';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { productModel } from '../product/product.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

/*

----------------service function for i nserting review data in DB----------------*/
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

const postProductReviewIntoDB = async (reviewData: TReview) => {
  // userId: new mongoose.Types.ObjectId(userId),

  const query = {
    _id: new mongoose.Types.ObjectId(reviewData?.product),
  };

  const product = await productModel.findOne(query);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product does not exixts!');
  }

  const session = await mongoose.startSession();

  try {
    // Start the transaction
    session.startTransaction();

    //Create a new rating (transaction-1)
    const result1 = await Review.create([reviewData], { session });

    if (!result1.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not post rating!');
    }

    //Retrieve all ratings for the product (including the newly added one)
    const result2 = await Review.find({ product: reviewData?.product }).session(
      session,
    );

    // Calculate the average rating
    let avgRating = 0;
    if (result2.length > 0) {
      const totalRating = result2.reduce(
        (sum, rating) => sum + rating.rating,
        0,
      );
      avgRating = totalRating / result2.length;
    } else {
      avgRating = 0;
    }

    //Update the product's average rating (transaction-2)
    const updatedDoc = {
      $set: { rating: avgRating },
    };

    const result3 = await productModel.updateOne(query, updatedDoc, {
      session,
    });

    if (result3.modifiedCount === 0) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Could not update rating!');
    }

    // Commit the transaction if everything is successful
    await session.commitTransaction();
    await session.endSession();

    return result1;
  } catch (err: any) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getProductReviewsFromDB = async (productId: string) => {
  const response = await Review.find({
    isDeleted: { $ne: true },
    type: REVIEW_TYPE.Product,
    product: new mongoose.Types.ObjectId(productId),
  }).populate('user');

  return response;
};

export const ReviewServices = {
  postOverallReviewIntoDB,
  getOverallReviewsFromDB,
  postProductReviewIntoDB,
  getProductReviewsFromDB,
};
