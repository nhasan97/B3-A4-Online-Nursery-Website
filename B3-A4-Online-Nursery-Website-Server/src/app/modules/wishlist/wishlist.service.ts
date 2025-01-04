import mongoose from 'mongoose';
import { TWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';
import AppError from '../../Errors/AppError';
import httpStatus from 'http-status';

/*

service function for getting items from wishlist*/
const getItemsOfWishlistFromDB = async (
  query: Record<string, unknown>,
  userId: string,
) => {
  const queryObject = { ...query };

  const searchTerm = (query?.searchTerm as string) || '';
  const searchableFields = ['title'];

  const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];

  excludeFields.forEach((el) => delete queryObject[el]);

  const filterQuery = Wishlist.find({
    isDeleted: { $ne: true },
    userId: new mongoose.Types.ObjectId(userId),
    ...queryObject,
  }).populate({
    path: 'productId',
    match: {
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    },
  });

  let sort = '-createdAt';
  if (query?.sort) {
    sort = query?.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query?.limit) {
    limit = Number(query?.limit);
  }
  if (query?.page) {
    page = Number(query?.page);
    skip = page * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const wishlistItems = await paginateQuery.limit(limit);

  const wishlistItemCount = await Wishlist.countDocuments({
    isDeleted: { $ne: true },
    userId: new mongoose.Types.ObjectId(userId),
  });

  return { wishlistItems, wishlistItemCount };
};

// const getItemsOfWishlistFromDB = async (
//   query: Record<string, unknown>,
//   userId: string,
// ) => {
//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     throw new Error('Invalid userId format');
//   }

//   const userObjectId = new mongoose.Types.ObjectId(userId);

//   const queryObject = { ...query };
//   const searchTerm = (query?.searchTerm as string) || '';
//   const searchableFields = ['title'];

//   const excludeFields = ['searchTerm', 'sort', 'limit', 'page'];
//   excludeFields.forEach((el) => delete queryObject[el]);

//   const filters = {
//     isDeleted: { $ne: true },
//     userId: userObjectId,
//     ...queryObject,
//   };

//   let wishlistQuery = Wishlist.find(filters).populate({
//     path: 'productId',
//     match: {
//       $or: searchableFields.map((field) => ({
//         [field]: { $regex: searchTerm, $options: 'i' },
//       })),
//     },
//   });

//   const sort = (query?.sort as string) || '-createdAt';
//   wishlistQuery = wishlistQuery.sort(sort);

//   const limit = Number(query?.limit) || 10;
//   const page = Number(query?.page) || 1;
//   const skip = page * limit;
//   wishlistQuery = wishlistQuery.skip(skip).limit(limit);

//   const wishlistItems = await wishlistQuery.exec();

//   const filteredWishlistItems = wishlistItems.filter(
//     (item) => item.productId !== null,
//   );

//   const wishlistItemCount = await Wishlist.countDocuments({
//     isDeleted: { $ne: true },
//     userId: userObjectId,
//   });

//   return { wishlistItems: filteredWishlistItems, wishlistItemCount };
// };

/*

service function for adding items to wishlist*/
const addItemToWishlistInDB = async (wishlistItemData: TWishlist) => {
  const response = await Wishlist.create(wishlistItemData);
  return response;
};
/*

service function for deleting items from wishlist*/
const deleteItemFromWishlistInDB = async (itemId: string) => {
  const loadedWishlistItem = await Wishlist.doesWishlistItemExist(itemId);

  if (!loadedWishlistItem) {
    throw new AppError(httpStatus.NOT_FOUND, 'Item not found');
  }

  const itemDeleted = Wishlist.findByIdAndUpdate(itemId, { isDeleted: true });

  if (!itemDeleted) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Faild to delete Item',
    );
  }

  return itemDeleted;
};

export const WhishlistServices = {
  getItemsOfWishlistFromDB,
  addItemToWishlistInDB,
  deleteItemFromWishlistInDB,
};
