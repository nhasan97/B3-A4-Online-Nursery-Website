import NoData from "@/components/shared/NoData";

import { TWishlist } from "@/types/wishlist.type";
import WishlistTableRow from "./WishlistTableRow";
import LazyLoadingWishlistTableRow from "./LazyLoadingWishlistTableRow";

const TabPCView = ({
  loadingWishlistItems,
  wishlistItems,
}: {
  loadingWishlistItems: boolean;
  wishlistItems: TWishlist[];
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
            <th className="flex-1">Image</th>
            <th className="flex-1">Title</th>
            <th className="flex-1">Price</th>
            <th className="flex-1">Stock Status</th>
            <th className="flex-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {loadingWishlistItems ? (
            Array.from({ length: 10 }).map((_, index) => (
              <LazyLoadingWishlistTableRow index={index} />
            ))
          ) : wishlistItems.length > 0 ? (
            wishlistItems.map((item: TWishlist) => (
              <WishlistTableRow key={item._id} item={item}></WishlistTableRow>
            ))
          ) : (
            <NoData text={"No Items Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
