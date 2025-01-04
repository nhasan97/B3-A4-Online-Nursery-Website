import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { WhishlistServices } from './wishlist.service';
/*

controller function for getting items from wishlist*/
const getItemsOfWishlist = catchAsync(async (req, res) => {
  const response = await WhishlistServices.getItemsOfWishlistFromDB(
    req?.query,
    req?.params?.userId,
  );
  //sending response
  //   if (response.length) {
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Wishlist items retrieved successfully',
    response,
  );
  //   } else {
  //     sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  //   }
});
/*

controller function for adding item to wishlist*/
const addItemToWishlist = catchAsync(async (req, res) => {
  const response = await WhishlistServices.addItemToWishlistInDB(req?.body);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Item added to wishlist successfully',
    response,
  );
});
/*

controller function for deleting item from wishlist*/
const deleteItemFromWishlist = catchAsync(async (req, res) => {
  const response = await WhishlistServices.deleteItemFromWishlistInDB(
    req?.params?.itemId,
  );

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Item successfully deleted from wishlist',
    response,
  );
});

export const WhishlistControllers = {
  getItemsOfWishlist,
  addItemToWishlist,
  deleteItemFromWishlist,
};
