import { TProductProp } from "@/types/product.type";
import { Button } from "../ui/button";
import StarRating from "../shared/StarRating";
import { Link } from "react-router-dom";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";

const ProductCard = ({ product }: TProductProp) => {
  const { handleAddToCart } = useCartContext() as TCartContext;

  return (
    <div className="w-full p-1 space-y-3 rounded-3xl border ">
      <Link to={`/product-details/${product?._id}`}>
        <div className="bg-[#98b2992f] rounded-[20px] h-[300px]">
          <img
            src={product?.image}
            alt=""
            className="w-full h-full rounded-[20px]"
          />
        </div>

        <div className="flex flex-col gap-2 px-2 py-3">
          <h6 className="text-lg text-[#757575] font-medium">
            {product?.title}
          </h6>

          <div className="w-full flex justify-between items-center">
            <StarRating rating={product?.rating}></StarRating>
            <h5 className="text-lg text-[#202634] font-bold">
              ${product?.price}
            </h5>
          </div>
        </div>
      </Link>

      <Button
        className="w-full bg-[#5D7E5F] rounded-[20px]"
        disabled={product?.stock <= 0}
        onClick={() => handleAddToCart(product)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
