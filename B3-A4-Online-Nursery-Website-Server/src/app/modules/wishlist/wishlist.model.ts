import { model, Schema } from 'mongoose';
import { TWishlist, WishlistModel } from './wishlist.interface';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

const wishlistSchema = new Schema<TWishlist, WishlistModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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

//using document middleware for checking if the document already exists or not
wishlistSchema.pre('save', async function (next) {
  const doesExist = await Wishlist.findOne({
    userId: this.userId,
    productId: this.productId,
  });
  if (doesExist) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Item already exists in wishlist',
    );
  }
  next();
});

//using query middleware for fetching documents not having isDeleted property as true
wishlistSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//using query middleware for fetching single document not having isDeleted property as true
wishlistSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

wishlistSchema.statics.doesWishlistItemExist = async function (id: string) {
  return await Wishlist.findById(id);
};

export const Wishlist = model<TWishlist, WishlistModel>(
  'Wishlist',
  wishlistSchema,
);
