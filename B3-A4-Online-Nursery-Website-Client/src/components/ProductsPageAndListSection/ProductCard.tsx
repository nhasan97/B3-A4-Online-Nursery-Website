import { TProduct } from "@/types/product.type";
import { Button } from "../ui/button";
import StarRating from "../shared/StarRating";

const ProductCard = ({ product }: { product: TProduct }) => {
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

      <Button className="w-full bg-[#5D7E5F] rounded-[20px]">
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
