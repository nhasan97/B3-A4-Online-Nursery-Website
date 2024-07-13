import categoryApi from "@/redux/api/CategoryApi";
import Container from "../../layouts/rootLayout/Container";
import Loading from "../../shared/Loading";
import { TCategory } from "@/types/category.type";
import NoData from "../../shared/NoData";
import SiteTitle from "../../shared/SiteTitle";
import CategoryCards from "./CategoryCards";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

const CategorySection = () => {
  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery(undefined);

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div className="w-full h-full py-10 my-20">
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-16">
          <SiteTitle title={"Categories"}></SiteTitle>

          {loadingCategories ? (
            <Loading></Loading>
          ) : categories!.data?.length > 0 ? (
            <div className="w-full h-full">
              <Carousel
                plugins={[plugin.current]}
                className="w-[70%] sm:w-[80%] md:w-[90%] xl:w-full mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {categories!.data?.map((category: TCategory) => (
                    <CarouselItem
                      key={category?._id}
                      className="sm:basis-1/2 md:basis-1/3 lg:md:basis-1/4 xl:basis-1/5"
                    >
                      <div className="p-1">
                        <CategoryCards category={category}></CategoryCards>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          ) : (
            <NoData text={"No Category Found"}></NoData>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategorySection;
