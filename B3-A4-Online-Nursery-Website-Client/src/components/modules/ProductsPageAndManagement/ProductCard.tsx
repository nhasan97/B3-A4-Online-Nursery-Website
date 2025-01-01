import { TProductProp } from "@/types/product.type";
import { Button } from "../../ui/button";
import StarRating from "../../shared/StarRating";
import { Link } from "react-router-dom";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";

const ProductCard = ({ product }: TProductProp) => {
  const { handleAddToCart } = useCartContext() as TCartContext;

  return (
    <div className="w-full h-fit bg-white p-1 space-y-3 rounded-3xl border group">
      <div className="bg-[#98b2992f] rounded-[20px] h-[300px] overflow-hidden">
        <img
          src={product?.image}
          alt=""
          className="w-full h-full rounded-[20px] transition-all ease-in-out duration-300 group-hover:scale-110 "
        />

        <div className="flex justify-evenly items-center gap-1 px-2 translate-y-full transition-all ease-in-out duration-300 group-hover:-translate-y-12">
          <Link to={`/product-details/${product?._id}`} className="w-full">
            <Button
              className="w-full bg-[#5D7E5F] text-lg px-8 rounded-l-[20px] rounded-r-none"

              // onClick={}
            >
              <i className="fa-solid fa-eye"></i>
            </Button>{" "}
          </Link>
          <Button
            className="w-full bg-[#5D7E5F] text-lg rounded-none"
            // onClick={() => handleAddToCart(product)}
          >
            <i className="fa-solid fa-heart"></i>
          </Button>

          <Button
            className="w-full bg-[#5D7E5F] text-lg rounded-r-[20px] rounded-l-none"
            disabled={product?.stock <= 0}
            onClick={() => handleAddToCart(1, product)}
          >
            <i className="fa-solid fa-cart-shopping"></i>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-2 py-3">
        <h6 className="text-lg text-[#757575] font-medium">{product?.title}</h6>

        <div className="w-full flex justify-between items-center">
          <StarRating rating={product?.rating}></StarRating>
          <h5 className="text-lg text-[#202634] font-bold">
            ${product?.price}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
