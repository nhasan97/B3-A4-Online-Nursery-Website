/* eslint-disable @typescript-eslint/no-explicit-any */
import wishlistApi from "@/redux/api/wishlistApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { TChildren } from "@/types/children.type";
import { TWishlist, TWishlistContext } from "@/types/wishlist.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { verifyToken } from "@/utils/verifyToken";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const WishlistContext = createContext<TWishlistContext | undefined>(
  undefined
);
const WishlistProvider = ({ children }: TChildren) => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { isLoading: loadingWishlistItems, data: loadedWishlistItems } =
    wishlistApi.useGetItemsFromWishlistQuery({
      searchTerm,
      currentPage,
      itemsPerPage,
      userId: (user as TUser)?.id || "",
    });

  const [addItemToWishlist] = wishlistApi.useAddItemToWishlistMutation();
  const [deleteItemFromWishlist] =
    wishlistApi.useDeleteItemFromWishlistMutation();

  const handleAddItemToWishlist = async (productId: string) => {
    const wishlistItem: TWishlist = {
      userId: (user as TUser)?.id,
      productId,
    };
    try {
      const res = await addItemToWishlist(wishlistItem).unwrap();
      displaySuccessToast(res);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleDeleteItemfromWishlist = async (itemId: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: catchAsync(async () => {
          const res = await deleteItemFromWishlist(itemId).unwrap();
          displaySuccessToast(res);
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const resetBrowser = () => {
    setSearchTerm("");
  };

  const resetPagination = () => {
    setItemsPerPage(10);
    setCurrentPage(0);
  };

  const wishlistInfo: TWishlistContext = {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,

    loadingWishlistItems,
    wishlistItems: loadedWishlistItems?.data?.wishlistItems,
    wishlistItemCount: loadedWishlistItems?.data?.wishlistItemCount,

    handleAddItemToWishlist,
    handleDeleteItemfromWishlist,

    resetBrowser,
    resetPagination,
  };

  return (
    <WishlistContext.Provider value={wishlistInfo}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
