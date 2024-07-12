import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import CategoryTableRow from "./CategoryTableRow";

const TabPCView = ({ loadingCategories, categories }) => {
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
            {categories!.data?.map((category) => (
              <CategoryTableRow key={category._id} {...category} />
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
