import express from 'express';
import { WhishlistControllers } from './wishlist.controller';

const router = express.Router();

//------------route for adding item to wishlist------------
router.get(
  '/get-items-from-wishlist/:userId',
  WhishlistControllers.getItemsOfWishlist,
);

//------------route for adding item to wishlist------------
router.post('/add-item-to-wishlist', WhishlistControllers.addItemToWishlist);

//------------route for deleting item from wishlist------------
router.delete(
  '/delete-item-from-wishlist/:itemId',
  WhishlistControllers.deleteItemFromWishlist,
);

export const wishlistRoutes = router;
