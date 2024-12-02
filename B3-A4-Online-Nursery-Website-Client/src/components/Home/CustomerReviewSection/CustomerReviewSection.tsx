import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import { useEffect, useState } from "react";
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

const CustomerReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("clientReviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);

  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   // speed: 500,
  //   slidesToShow: 4,
  //   slidesToScroll: 4,
  //   initialSlide: 0,
  //   autoplay: true,
  //   speed: 3000,
  //   autoplaySpeed: 3000,
  //   cssEase: "linear",
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 3,
  //         slidesToScroll: 3,
  //         infinite: true,
  //         dots: true,
  //       },
  //     },
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 2,
  //         initialSlide: 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  // };

  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col gap-8 sm:gap-16">
          <SiteTitle title={"Clients Reviews"}></SiteTitle>

          <div className="">
            {/* <Slider {...settings}> */}
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
              {reviews.map((review: TReview) => (
                <SwiperSlide>
                  <ReviewCard key={review._id} review={review}></ReviewCard>
                </SwiperSlide>
              ))}
              {/* </Slider> */}
            </Swiper>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CustomerReviewSection;
