import Loading from "@/components/shared/Loading";
import ProductTableRow from "./ProductTableRow";
import NoData from "@/components/shared/NoData";
import { TProduct } from "@/types/product.type";

const TabPCView = ({ loadingProducts, products, loadingNumberOfProducts }) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      {loadingProducts || loadingNumberOfProducts ? (
        <Loading></Loading>
      ) : products?.length > 0 ? (
        <table className="w-full">
          {/* head */}
          <thead>
            <tr className="flex  justify-between items-center text-[#757575] p-5 border-b">
              <th className="flex-1">Image</th>
              <th className="flex-1">Title</th>
              <th className="flex-1">Details</th>
              <th className="flex-1">Category</th>
              <th className="flex-1">Price</th>
              <th className="flex-1">Stock</th>
              <th className="flex-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {products?.map((product: TProduct) => (
              <ProductTableRow key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      ) : (
        <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default TabPCView;
