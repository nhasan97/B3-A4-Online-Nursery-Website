import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import ReviewCard from "./ReviewCard";
import { TReview } from "@/types/review.type";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import PostReviewModal from "./PostReviewModal";
import { useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import reviewApi from "@/redux/api/reviewApi";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";

const CustomerReviewSection = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const { isLoading: loadingReviews, data: loadedReviews } =
    reviewApi.useGetOverallReviewsQuery(undefined);

  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col  gap-6 sm:gap-12">
          <SiteTitle title={"Clients Reviews"}></SiteTitle>

          {loadingReviews ? (
            <Loading />
          ) : loadedReviews?.data?.length > 0 ? (
            <div className="">
              <div className="flex md:hidden">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={1}
                  loop={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectCoverflow, Pagination]}
                  className="mySwiper"
                >
                  {loadedReviews?.data?.map((review: TReview) => (
                    <SwiperSlide>
                      <ReviewCard key={review._id} review={review}></ReviewCard>
                    </SwiperSlide>
                  ))}
                  {/* </Slider> */}
                </Swiper>
              </div>

              <div className="hidden md:flex">
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  slidesPerView={3}
                  loop={true}
                  coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                    slideShadows: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[EffectCoverflow, Pagination]}
                  className="mySwiper"
                >
                  {loadedReviews?.data?.map((review: TReview) => (
                    <SwiperSlide>
                      <ReviewCard key={review._id} review={review}></ReviewCard>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            <NoData text="No Reviews Found" />
          )}

          {(user as TUser)?.email ? (
            <div className="w-full text-center">
              <PostReviewModal />
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
};

export default CustomerReviewSection;
