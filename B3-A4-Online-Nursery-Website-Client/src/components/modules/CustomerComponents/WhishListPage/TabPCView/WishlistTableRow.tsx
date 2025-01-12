import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa6";
import { TWishlist, TWishlistContext } from "@/types/wishlist.type";
import { TProduct } from "@/types/product.type";
import { TCartContext } from "@/types/cart.type";
import useCartContext from "@/hooks/useCartContext";
import useWishlistContext from "@/hooks/useWishlistContext";

const WishlistTableRow = ({ item }: { item: TWishlist }) => {
  const { images, title, price, stock } = item?.productId as TProduct;

  const { handleAddToCart } = useCartContext() as TCartContext;
  const { handleDeleteItemfromWishlist } =
    useWishlistContext() as TWishlistContext;

  return (
    <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
      <td className="flex-1 justify-between items-center">
        <img
          src={images[0]}
          className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
        ></img>
      </td>

      <td className="flex-1 font-semibold text-[#5D7E5F]">{title}</td>

      <td className="flex-1">${price.toFixed(2)}</td>

      <td className="flex-1">
        {stock > 10 && (
          <p className="w-fit mx-auto py-2 px-4 bg-green-100 text-green-700 rounded-full">
            In Stock
          </p>
        )}
        {stock > 0 && stock < 10 && (
          <p className="w-fit mx-auto py-2 px-4 bg-orange-100 text-orange-600 rounded-full">
            Low In Stock
          </p>
        )}
        {stock <= 0 && (
          <p className="w-fit mx-auto py-2 px-4 bg-red-100 text-red-600 rounded-full">
            Stock Out
          </p>
        )}
      </td>

      <td className="flex-1">
        <Button
          className="bg-transparent hover:bg-green-100 text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full"
          disabled={stock <= 0}
          onClick={() => handleAddToCart(1, item?.productId as TProduct)}
        >
          <FaCartPlus />
        </Button>

        <Button
          className="bg-transparent hover:bg-red-100 text-2xl sm:text-xl text-[#757575] hover:text-red-600 rounded-full"
          onClick={() => handleDeleteItemfromWishlist(item?._id as string)}
        >
          <MdDelete />
        </Button>
      </td>
    </tr>
  );
};

export default WishlistTableRow;
