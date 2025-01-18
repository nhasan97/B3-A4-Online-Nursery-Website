/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../../../ui/button";
import { MdInfo } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogClose,
} from "../../../ui/dialog";
import { TProductProp } from "@/types/product.type";
import StarRating from "../../../shared/StarRating";
import { IoSunny } from "react-icons/io5";
import { GiFertilizerBag, GiWateringCan } from "react-icons/gi";
import reviewApi from "@/redux/api/reviewApi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";
import Loading from "@/components/shared/Loading";

const DetailsProductModal = ({ product }: TProductProp) => {
  const { isLoading: loadingProductReviews, data: productReviews } =
    reviewApi.useGetProductReviewsQuery(product?._id);

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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-transparent hover:bg-[#98b2992f] text-2xl sm:text-xl text-[#757575] hover:text-[#5D7E5F] rounded-full">
          <MdInfo />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[80%] overflow-y-auto">
        <DialogHeader>
          <div className="w-full h-full">
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
        </DialogHeader>

        {loadingProductReviews ? (
          <Loading />
        ) : (
          <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start bg-white">
            <div className="w-full h-full flex flex-col justify-between items-start gap-6 py-5">
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
                <p>({productReviews?.data?.length})</p>
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
                    <p className="text-sm text-[#757575]">
                      {product?.soilType}
                    </p>
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

              <div className="space-y-2">
                <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                  Stock Status
                </h6>
                {product?.stock > 10 && (
                  <p className="w-fit py-2 px-4 bg-green-100 text-green-700 rounded-full">
                    In Stock
                  </p>
                )}
                {product?.stock > 0 && product?.stock < 10 && (
                  <p className="w-fit py-2 px-4 bg-orange-100 text-orange-600 rounded-full">
                    Low In Stock
                  </p>
                )}
                {product?.stock <= 0 && (
                  <p className="w-fit py-2 px-4 bg-red-100 text-red-600 rounded-full">
                    Stock Out
                  </p>
                )}
              </div>

              <h5 className="text-xl lg:text-2xl font-semibold">
                Price: ${product?.price}
              </h5>
            </div>
          </div>
        )}

        <DialogClose asChild>
          <Button className="mt-4 bg-[#5D7E5F] text-lg font-semibold mb-5 space-x-2 rounded-full">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsProductModal;
