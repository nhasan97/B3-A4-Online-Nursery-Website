import ProductTableRow from "./ProductTableRow";
import NoData from "@/components/shared/NoData";
import { TProduct, TProductManagementProp } from "@/types/product.type";
import LazyLoadingProductTableRow from "./LazyLoadingProductTableRow";

const TabPCView = ({
  loadingProducts,
  products,
  loadingNumberOfProducts,
}: TProductManagementProp) => {
  return (
    <div className="bg-white hidden sm:block w-full h-[80%] overflow-y-auto rounded-lg border">
      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
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

          {loadingProducts || loadingNumberOfProducts ? (
            Array.from({ length: 10 }).map((_, index) => (
              <LazyLoadingProductTableRow index={index} />
            ))
          ) : products?.length > 0 ? (
            products?.map((product: TProduct) => (
              <ProductTableRow key={product._id} product={product} />
            ))
          ) : (
            <NoData text={"No Products Found"}></NoData>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TabPCView;
