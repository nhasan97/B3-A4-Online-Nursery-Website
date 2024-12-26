import Container from "../layouts/rootLayout/Container";
import { Button } from "../ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";
import bannerImg1 from "../../assets/images/slide1.png";
import bannerImg2 from "../../assets/images/330cfb4a-076c-439c-85d0-5aef6fe74935_360.jpeg";
import bannerImg3 from "../../assets/images/slide3.png";
import plant from "../../assets/images/plant1.png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const Banner = () => {
  const navigate = useNavigate();
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full bg-[#98b2992f] md:bg-[url(../public/palm2.png)] bg-no-repeat bg-top-left bg-auto">
      <Container>
        <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 md:gap-3 py-6">
          <div className="w-full md:w-1/2 text-center sm:text-left space-y-3 lg:space-y-6 relative">
            <h1 className="text-center sm:text-left text-[#5D7E5F] text-3xl md:text-[40px] lg:text-[50px] font-bold leading-[40px] md:leading-[55px] lg:leading-[70px]">
              Bringing Nature Home
            </h1>

            <p className="text-[#757575] text-base md:text-lg leading-6 text-justify">
              Blooms & Beyond is your go-to online nursery for ~
            </p>

            <div className="text-[#757575] text-base md:text-lg text-left leading-8">
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> A diverse
                selection of vibrant plants
              </p>
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> Gardening
                supplies
              </p>
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> And expert
                advice
              </p>
            </div>

            <Button
              className="bg-white text-[#5D7E5F] text-xl rounded-full"
              onClick={() => navigate("/all-products")}
            >
              Explore
              <RiArrowRightLine />
            </Button>

            <img
              src={plant}
              alt=""
              className="hidden lg:flex w-[55%] absolute bottom-0 right-0 lg:translate-x-[70%] xl:translate-x-[50%] lg:translate-y-[55%] xl:translate-y-[62%] z-20"
            />
          </div>

          <div className="w-full h-fit md:w-1/2 lg:w-1/3  bg-[#98b299a6] p-10">
            <Carousel
              plugins={[plugin.current]}
              className=""
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                <CarouselItem>
                  <img src={bannerImg1} alt="" className="w-full" />
                </CarouselItem>
                <CarouselItem>
                  <img src={bannerImg2} alt="" className="w-full" />
                </CarouselItem>
                <CarouselItem>
                  <img src={bannerImg3} alt="" className="w-full" />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
