import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import MobileViewCategoryCard from "./MobileViewCategoryCard";

const MobileView = ({ loadingCategories, categories }) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingCategories ? (
        <Loading></Loading>
      ) : categories!.data?.length > 0 ? (
        categories!.data?.map((category) => (
          <MobileViewCategoryCard
            key={category._id}
            {...category}
          ></MobileViewCategoryCard>
        ))
      ) : (
        <NoData text={"No Category Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
