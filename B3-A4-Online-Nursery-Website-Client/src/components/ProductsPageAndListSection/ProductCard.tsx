import { TProduct } from "@/types/product.type";
import { Button } from "../ui/button";
import StarRating from "../shared/StarRating";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart, editQty } from "@/redux/features/cartSlice";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: TProduct }) => {
  const dispatch = useAppDispatch();
  const itemsInCart = useAppSelector(
    (currentState) => currentState.cart.cartItems
  );

  const handleAddToCart = () => {
    const matchedItem = itemsInCart.find((item) => item?._id === product?._id);

    if (matchedItem && matchedItem?.qty + 1 <= matchedItem?.stock) {
      const payload = {
        _id: matchedItem?._id,
        qty: matchedItem?.qty + 1,
      };
      dispatch(editQty(payload));
    } else if (product.stock > 0 && !(product?.stock - 1 < 0)) {
      const item = {
        _id: product?._id,
        title: product?.title,
        price: product?.price,
        stock: product?.stock,
        qty: 1,
        image: product?.image,
      };
      dispatch(addToCart(item));
      toast.success("Product successfully added to cart");
    }
  };

  return (
    <div className="w-full h-full p-1 space-y-3 rounded-3xl border ">
      <div className="bg-[#98b2992f] rounded-[20px] h-[300px]">
        <img
          src={product?.image}
          alt=""
          className="w-full h-full rounded-[20px]"
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-3 text-center">
        <h6 className="text-lg text-[#757575] font-medium">{product?.title}</h6>

        <StarRating rating={product?.rating}></StarRating>

        <h5 className="text-2xl font-semibold">${product?.price}</h5>
      </div>

      <Button
        className="w-full bg-[#5D7E5F] rounded-[20px]"
        disabled={product?.stock <= 0}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
