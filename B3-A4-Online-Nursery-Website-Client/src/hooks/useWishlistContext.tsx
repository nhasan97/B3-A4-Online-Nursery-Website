import { WishlistContext } from "@/providers/WishlistProvider";
import { useContext } from "react";

const useWishlistContext = () => {
  const wishlistInfo = useContext(WishlistContext);
  return wishlistInfo;
};

export default useWishlistContext;
