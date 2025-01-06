import NoData from "@/components/shared/NoData";
import MobileViewCategoryCard from "./MobileViewCategoryCard";
import { TCategory } from "@/types/category.type";
import LazyLaodingCategoryCard from "./LazyLaodingCategoryCard";

const MobileView = ({
  loadingCategories,
  categories,
}: {
  loadingCategories: boolean;
  categories: TCategory[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingCategories ? (
        Array.from({ length: 10 }).map((_, index) => (
          <LazyLaodingCategoryCard index={index} />
        ))
      ) : categories?.length > 0 ? (
        categories?.map((category: TCategory) => (
          <MobileViewCategoryCard
            key={category?._id}
            category={category}
          ></MobileViewCategoryCard>
        ))
      ) : (
        <NoData text={"No Category Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
