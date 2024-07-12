import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import CategoryTableRow from "./CategoryTableRow";
import { TCategory } from "@/types/category.type";
import categoryApi from "@/redux/api/CategoryApi";

const TabPCView = () => {
  const { isLoading: loadingCategories, data: categories } =
    categoryApi.useGetCategoriesQuery(undefined);

  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      {loadingCategories ? (
        <Loading></Loading>
      ) : categories!.data?.length > 0 ? (
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
            {categories!.data?.map((category: TCategory) => (
              <CategoryTableRow key={category?._id} category={category} />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData text={"No Category Found"}></NoData>
      )}
    </div>
  );
};

export default TabPCView;
