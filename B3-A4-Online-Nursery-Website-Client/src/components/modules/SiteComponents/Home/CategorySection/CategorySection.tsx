import Container from "../../../../layouts/rootLayout/Container";
import Loading from "../../../../shared/Loading";
import { TCategory, TCategoryContext } from "@/types/category.type";
import NoData from "../../../../shared/NoData";
import SiteTitle from "../../../../shared/SiteTitle";
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
import useCategoryContext from "@/hooks/useCategoryContext";
import categoryApi from "@/redux/api/CategoryApi";

const CategorySection = () => {
  const { loadingCategoryCount, totalCategory } =
    useCategoryContext() as TCategoryContext;

  const { isLoading: loadingCategories, data: loadedCategories } =
    categoryApi.useGetCategoriesQuery({
      searchTerm: "",
      sort: "",
      currentPage: 0,
      itemsPerPage: totalCategory,
    });

  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <div
      id="category"
      className="w-full h-full py-20 md:py-40 bg-[url(../public/leaf.png)] bg-no-repeat bg-left bg-contain bg-fixed"
    >
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-12">
          <SiteTitle title={"Categories"}></SiteTitle>

          {loadingCategories || loadingCategoryCount ? (
            <Loading></Loading>
          ) : loadedCategories?.data?.length > 0 ? (
            <div className="w-full h-full">
              <Carousel
                plugins={[plugin.current]}
                className="w-[70%] sm:w-[80%] md:w-[90%] xl:w-full mx-auto"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
              >
                <CarouselContent>
                  {loadedCategories?.data?.map((category: TCategory) => (
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
