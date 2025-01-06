import { TUser } from "./auth.type";
import { TProduct } from "./product.type";

export type TWishlist = {
  _id?: string;
  userId: string | TUser;
  productId: string | TProduct;
};

export type TWishlistContext = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;

  loadingWishlistItems: boolean;
  wishlistItems: TWishlist[];
  wishlistItemCount: number;

  handleAddItemToWishlist: (productId: string) => Promise<void>;
  handleDeleteItemfromWishlist: (productId: string) => Promise<void>;

  resetBrowser: () => void;
  resetPagination: () => void;
};
