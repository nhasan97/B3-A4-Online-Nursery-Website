import Loading from "@/components/shared/Loading";
import { TReview } from "@/types/review.type";
import NoData from "@/components/shared/NoData";
import ProductReviewCard from "./ProductReviewCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination, Navigation } from "swiper/modules";

const ProductReviewsSection = ({
  loadingProductReviews,
  productReviews,
}: {
  loadingProductReviews: boolean;
  productReviews: TReview[];
}) => {
  return (
    <div>
      <h3 className="text-[#505050] text-2xl font-semibold">
        Reviews ({productReviews?.length})
      </h3>

      {loadingProductReviews ? (
        <Loading></Loading>
      ) : productReviews?.length > 0 ? (
        <div className="w-full h-fit">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            {productReviews.map((review) => (
              <SwiperSlide>
                <ProductReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <NoData text={"No Reviews Found"}></NoData>
      )}
    </div>
  );
};

export default ProductReviewsSection;
