import mongoose from 'mongoose';
import { z } from 'zod';
import { REVIEW_TYPE } from './review.contants';

const postReviewValidationSchema = z.object({
  body: z.object({
    user: z
      .string({
        required_error: 'User is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      }),
    product: z
      .string({
        required_error: 'Product is required',
      })
      .refine((val) => {
        return mongoose.Types.ObjectId.isValid(val);
      })
      .optional(),
    rating: z.number({
      required_error: 'Rating is required',
    }),
    say: z.string({
      required_error: 'Say is required',
    }),
    type: z.nativeEnum(REVIEW_TYPE),
  }),
});

export const ReviewValidation = {
  postReviewValidationSchema,
};
