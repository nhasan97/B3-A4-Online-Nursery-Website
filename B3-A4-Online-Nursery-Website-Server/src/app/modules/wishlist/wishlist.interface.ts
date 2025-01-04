import { Model, ObjectId } from 'mongoose';

//declaring type for wishlist
export type TWishlist = {
  userId: ObjectId;
  productId: ObjectId;
  isDeleted?: boolean;
};

//declaring type definition for doesWishlistItemExist static function
export interface WishlistModel extends Model<TWishlist> {
  doesWishlistItemExist(id: string): Promise<TWishlist>;
}
