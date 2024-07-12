import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import MobileViewCategoryCard from "./MobileViewCategoryCard";
import categoryApi from "@/redux/api/CategoryApi";
import { TCategory } from "@/types/category.type";

const MobileView = () => {
  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery(undefined);

  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingCategories ? (
        <Loading></Loading>
      ) : categories!.data?.length > 0 ? (
        categories!.data?.map((category: TCategory) => (
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
