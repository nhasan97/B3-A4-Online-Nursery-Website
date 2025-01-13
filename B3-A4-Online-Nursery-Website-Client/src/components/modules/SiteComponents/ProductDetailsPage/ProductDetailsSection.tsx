/* eslint-disable @typescript-eslint/no-explicit-any */

import Loading from "@/components/shared/Loading";
import StarRating from "@/components/shared/StarRating";
import { Button } from "@/components/ui/button";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";
import { TProduct } from "@/types/product.type";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { GiFertilizerBag, GiWateringCan } from "react-icons/gi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

const ProductDetailsSection = ({
  product,
  loadingProduct,
  loadingProductReviews,
  productReviewsCount,
}: {
  product: TProduct;
  loadingProduct: boolean;
  loadingProductReviews: boolean;
  productReviewsCount: number;
}) => {
  const { desiredQty, handleEditQtyInProductDetails, handleAddToCart } =
    useCartContext() as TCartContext;

  const [activeImage, setActiveImage] = useState(0);

  const handleMoveToRightImage = () => {
    if (activeImage + 1 < product?.images?.length)
      setActiveImage(activeImage + 1);
  };

  const handleMoveToLeftImage = () => {
    if (activeImage - 1 >= 0) {
      setActiveImage(activeImage - 1);
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("product-images-slider");
    slider!.scrollLeft = slider!.scrollLeft + 500;
  };
  const slideLeft = () => {
    const slider = document.getElementById("product-images-slider");
    slider!.scrollLeft = slider!.scrollLeft - 500;
  };

  return (
    <div>
      {loadingProduct || loadingProductReviews ? (
        <Loading></Loading>
      ) : (
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start bg-white">
          <div className="w-full md:w-1/2 h-full">
            <div className="w-full flex justify-between items-center gap-6 relative">
              {product?.images.length > 1 && (
                <Button
                  className="bg-transparent hover:bg-transparent p-1 text-black text-base md:text-lg absolute left-0 z-30"
                  onClick={() => handleMoveToLeftImage()}
                  disabled={0 >= activeImage}
                >
                  <FaChevronLeft />
                </Button>
              )}

              <img
                src={product?.images[activeImage]}
                alt=""
                className="w-full h-[250px] md:h-[450px] lg:h-[550px] rounded-[20px] object-fill object-center"
              />

              {product?.images.length > 1 && (
                <Button
                  className="bg-transparent hover:bg-transparent p-1 text-black text-base md:text-lg absolute right-0 z-30"
                  onClick={() => handleMoveToRightImage()}
                  disabled={product?.images.length <= activeImage}
                >
                  <FaChevronRight />
                </Button>
              )}
            </div>

            {product?.images.length > 1 && (
              <div className="w-full h-fit flex justify-evenly items-center gap-6 my-6">
                {product?.images.length > 4 && (
                  <Button
                    className="bg-transparent hover:bg-transparent p-1 text-black text-base md:text-lg"
                    onClick={() => slideLeft()}
                  >
                    <FaChevronLeft />
                  </Button>
                )}

                <div
                  id="product-images-slider"
                  className="w-full flex justify-evenly items-center gap-6 overflow-x-scroll scroll-smooth transition-all whitespace-nowrap scrollbar-hide"
                >
                  {product?.images.map((_: any, index: number) => (
                    <img
                      src={product?.images[index]}
                      alt=""
                      className={`size-24 rounded-[20px] object-fill object-center ${
                        activeImage !== index ? "opacity-50" : "opacity-100"
                      } hover:scale-105 transition-all`}
                      onClick={() => setActiveImage(index)}
                    />
                  ))}
                </div>
                {product?.images.length > 4 && (
                  <Button
                    className="bg-transparent hover:bg-transparent p-1 text-black text-base md:text-lg"
                    onClick={() => slideRight()}
                  >
                    <FaChevronRight />
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 h-full flex flex-col justify-between items-start gap-6 py-5 md:py-0 md:px-5 lg:px-10">
            <div className="flex items-center gap-6">
              <div className="space-y-2">
                <h6 className="text-2xl md:text-3xl lg:text-4xl text-[#505050] font-medium">
                  {product?.title}
                </h6>
                <p className="text-base text-[#757575] text-justify italic">
                  {product?.botanicalName}
                </p>
              </div>
              <p className="text-sm text-[#5D7E5F] p-1 rounded-full border border-[#5D7E5F]">
                {product?.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <StarRating rating={product?.rating}></StarRating>
              <p>({productReviewsCount})</p>
            </div>

            <p className="text-base text-[#757575] text-justify">
              {product?.description}
            </p>

            <div className="space-y-1">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Botanical Details
              </h6>

              <p className="text-base text-[#757575] text-justify">
                <span className="font-semibold">Plant Type : </span>{" "}
                {product?.plantType}
              </p>

              <p className="text-base text-[#757575] text-justify">
                <span className="font-semibold">Growth Rate : </span>{" "}
                {product?.growthRate}
              </p>

              <p className="text-base text-[#757575] text-justify">
                <span className="font-semibold">Height : </span>{" "}
                {product?.height}
              </p>

              <p className="text-base text-[#757575] text-justify">
                <span className="font-semibold"> Spread : </span>{" "}
                {product?.spread}
              </p>
            </div>

            <div className="w-full space-y-1">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Growing Conditions
              </h6>

              <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-6 py-5 text-center">
                <div className="w-full flex flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                  <IoSunny className="text-[#5D7E5F] text-5xl" />
                  <p className="font-medium">Sunlight Requirements</p>
                  <p className="text-sm text-[#757575]">
                    {product?.sunlightRequirements}
                  </p>
                </div>
                <div className="w-full flex flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                  <GiWateringCan className="text-[#5D7E5F] text-5xl" />
                  <p className="font-medium">Watering Needs</p>
                  <p className="text-sm text-[#757575]">
                    {product?.wateringNeeds}
                  </p>
                </div>
                <div className="w-full flex flex-col justify-start items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
                  <GiFertilizerBag className="text-[#5D7E5F] text-5xl" />
                  <p className="font-medium">Soil Type</p>
                  <p className="text-sm text-[#757575]">{product?.soilType}</p>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                Care Instructions
              </h6>

              <p className="text-base text-[#757575] text-justify">
                {product?.careInstructions}
              </p>
            </div>

            <h5 className="text-xl lg:text-2xl font-semibold">
              Price: ${product?.price}
            </h5>

            <div className="flex items-center gap-6">
              <div className="flex justify-center items-center gap-4 text-2xl p-3 rounded-lg border">
                <IoMdArrowDropup
                  className="hover:text-green-500 border-r"
                  onClick={() => handleEditQtyInProductDetails(1, product)}
                />
                {desiredQty}
                <IoMdArrowDropdown
                  className="hover:text-red-500 border-l"
                  onClick={() => handleEditQtyInProductDetails(-1, product)}
                />
              </div>

              <Button
                className="text-lg bg-[#5D7E5F] rounded-[20px]"
                disabled={product?.stock <= 0}
                onClick={() => handleAddToCart(desiredQty, product)}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsSection;
