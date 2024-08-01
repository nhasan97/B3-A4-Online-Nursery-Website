import Container from "@/components/layouts/rootLayout/Container";
import Loading from "@/components/shared/Loading";
import SiteTitle from "@/components/shared/SiteTitle";
import StarRating from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import useCartContext from "@/hooks/useCartContext";
import productApi from "@/redux/api/ProductApi";
import { TCartContext } from "@/types/cart.type";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const loadedId = useParams();

  const { isLoading: loadingProduct, data: product } =
    productApi.useGetSingleProductQuery(loadedId._id);

  const { handleAddToCart } = useCartContext() as TCartContext;

  return (
    <div className="w-full h-full bg-[url(../public/leaf2.png)] bg-no-repeat bg-right-top bg-contain bg-fixed">
      <Container>
        <div className="w-full h-full flex flex-col gap-10">
          <SiteTitle title={"Product Details"}></SiteTitle>

          <div>
            {loadingProduct ? (
              <Loading></Loading>
            ) : (
              <div className="w-full md:w-1/2 h-full bg-[url(../public/frame.png)] bg-no-repeat bg-center bg-auto mx-auto rounded-3xl relative md:p-40 md:my-40">
                <img
                  src={product?.data?.image}
                  alt=""
                  className="w-full md:w-2/3 h-full bg-[#98b2992f] rounded-[20px] shadow-2xl md:absolute left-0 top-0 md:translate-x-[-40%] md:translate-y-[-40%] z-20"
                />

                <div className="w-full md:w-2/3 h-full bg-white flex flex-col justify-center items-center gap-3 text-center p-5 rounded-[20px] shadow-2xl md:absolute right-0 bottom-0 md:translate-x-[40%] md:translate-y-[40%]">
                  <div className="flex gap-3">
                    <h6 className="text-2xl text-[#757575] font-medium">
                      {product?.data?.title}
                    </h6>
                    <p className="text-sm text-[#5D7E5F] p-1 rounded-full border border-[#5D7E5F]">
                      {product?.data?.category}
                    </p>
                  </div>

                  <p className="text-base text-[#808080]">
                    {product?.data?.description}
                  </p>

                  <StarRating rating={product?.data?.rating}></StarRating>
                  <h5 className="text-2xl font-semibold">
                    Price: ${product?.data?.price}
                  </h5>
                  <Button
                    className="text-lg bg-[#5D7E5F] rounded-[20px]"
                    disabled={product?.data?.stock <= 0}
                    onClick={() => handleAddToCart(product?.data)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
