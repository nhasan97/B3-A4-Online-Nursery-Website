import NoData from "@/components/shared/NoData";
import CategoryTableRow from "./CategoryTableRow";
import { TCategory } from "@/types/category.type";
import LazyLoadingCategoryTableRow from "./LazyLoadingCategoryTableRow";

const TabPCView = ({
  loadingCategories,
  categories,
}: {
  loadingCategories: boolean;
  categories: TCategory[];
}) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex  justify-between items-center text-[#757575] p-5 border-b">
            <th className="flex-1">Image</th>
            <th className="flex-1">Category</th>
            <th className="flex-1">Details</th>
            <th className="flex-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row  */}
          {loadingCategories ? (
            Array.from({ length: 10 }).map((_, index) => (
              <LazyLoadingCategoryTableRow index={index} />
            ))
          ) : categories?.length > 0 ? (
            categories?.map((category: TCategory) => (
              <CategoryTableRow key={category?._id} category={category} />
            ))
          ) : (
            <NoData text={"No Category Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
