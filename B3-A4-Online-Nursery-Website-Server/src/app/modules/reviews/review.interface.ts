import { ObjectId } from 'mongoose';
import { REVIEW_TYPE } from './review.contants';

export type TReview = {
  user: ObjectId;
  product?: ObjectId;
  rating: number;
  say: string;
  type: keyof typeof REVIEW_TYPE;
  isDeleted?: boolean;
};
