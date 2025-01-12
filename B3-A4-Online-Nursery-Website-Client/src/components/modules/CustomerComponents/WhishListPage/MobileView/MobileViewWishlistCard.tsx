import { TProduct } from "@/types/product.type";
import { MdDelete } from "react-icons/md";
import { TWishlist, TWishlistContext } from "@/types/wishlist.type";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";
import useWishlistContext from "@/hooks/useWishlistContext";
import { FaCartPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const MobileViewWishlistCard = ({ item }: { item: TWishlist }) => {
  const { images, title, price, stock } = item?.productId as TProduct;

  const { handleAddToCart } = useCartContext() as TCartContext;

  const { handleDeleteItemfromWishlist } =
    useWishlistContext() as TWishlistContext;

  return (
    <div className="h-fit  bg-white rounded-md shadow-md">
      <div className=" p-5 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={images[0]}
            className="size-14 p-[2px] border-2 border-[#5D7E5F] rounded-full"
          ></img>

          <h2 className=" text-[#5D7E5F] font-semibold ">{title}</h2>
        </div>

        <div className="flex justify-between items-center text-sm">
          <p className="text-[#808080]">${price}</p>
          {stock > 10 && (
            <p className="w-fit py-2 px-4 bg-green-100 text-green-700 rounded-full">
              In Stock
            </p>
          )}
          {stock > 0 && stock < 10 && (
            <p className="w-fit py-2 px-4 bg-orange-100 text-orange-600 rounded-full">
              Low In Stock
            </p>
          )}
          {stock <= 0 && (
            <p className="w-fit py-2 px-4 bg-red-100 text-red-600 rounded-full">
              Stock Out
            </p>
          )}
        </div>

        <div className="flex justify-between">
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-l-full">
            <Button
              className="bg-transparent hover:bg-green-100 text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full"
              onClick={() => handleAddToCart(1, item?.productId as TProduct)}
            >
              <FaCartPlus />
            </Button>
          </div>
          <div className="flex-1 flex justify-center items-center bg-[#98b2992f] rounded-r-full">
            <Button
              className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
              onClick={() => handleDeleteItemfromWishlist(item?._id as string)}
            >
              <MdDelete />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileViewWishlistCard;
