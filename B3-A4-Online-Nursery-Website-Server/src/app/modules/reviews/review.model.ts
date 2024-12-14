import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';
import { REVIEW_TYPE } from './review.contants';

const reviewSchema = new Schema<TReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    rating: {
      type: Number,
      required: true,
    },

    say: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: Object.keys(REVIEW_TYPE),
      required: true,
    },

    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    virtuals: true,
  },
);

//using query middleware for fetching documents not having isDeleted property as true
// commentSchema.pre('find', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

//using query middleware for fetching single document not having isDeleted property as true
// commentSchema.pre('findOne', async function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

reviewSchema.statics.doesReviewExist = async function (id: string) {
  return await Review.findById(id);
};
export const Review = model<TReview>('Review', reviewSchema);
