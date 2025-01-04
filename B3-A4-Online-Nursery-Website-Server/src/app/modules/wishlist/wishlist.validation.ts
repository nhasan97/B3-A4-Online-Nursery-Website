import mongoose from 'mongoose';
import { z } from 'zod';

const addWishlistItemValidationSchema = z.object({
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
      }),
  }),
});

export const WishlistValidation = {
  addWishlistItemValidationSchema,
};
