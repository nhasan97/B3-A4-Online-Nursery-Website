import NoData from "@/components/shared/NoData";
import { TWishlist } from "@/types/wishlist.type";
import LazyLoadingWishlistCard from "./LazyLoadingWishlistCard";
import MobileViewWishlistCard from "./MobileViewWishlistCard";

const MobileView = ({
  loadingWishlistItems,
  wishlistItems,
}: {
  loadingWishlistItems: boolean;
  wishlistItems: TWishlist[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingWishlistItems ? (
        Array.from({ length: 10 }).map((_, index: number) => (
          <LazyLoadingWishlistCard index={index} />
        ))
      ) : wishlistItems?.length > 0 ? (
        wishlistItems?.map((item: TWishlist) => (
          <MobileViewWishlistCard
            key={item._id}
            item={item}
          ></MobileViewWishlistCard>
        ))
      ) : (
        <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
