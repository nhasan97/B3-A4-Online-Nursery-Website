import NoData from "@/components/shared/NoData";
import { Button } from "@/components/ui/button";
import productApi from "@/redux/api/ProductApi";
import { TProduct } from "@/types/product.type";
import { FaArrowRightLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductOverview = () => {
  const { isLoading: loadingProducts, data: loadedProducts } =
    productApi.useGetProductsQuery({
      sort: "-createdAt",
      currentPage: 0,
      itemsPerPage: 3,
    });

  const navigate = useNavigate();
  return (
    <div className="flex-1 bg-white w-full h-[80%] overflow-y-auto rounded-lg">
      <h1 className="text-2xl font-semibold p-5">New Products</h1>

      <table className="w-full">
        {/* head */}
        <thead>
          <tr className="flex justify-between items-center text-[#757575] p-5 border-b">
            <th className="flex-1">Image</th>
            <th className="flex-1">Title</th>
            <th className="flex-1">Price</th>
            <th className="flex-1">Stock</th>
          </tr>
        </thead>
        <tbody>
          {loadingProducts ? (
            Array.from({ length: 3 }).map((_, index) => (
              <tr
                key={index}
                className="flex justify-between items-center text-[#808080] text-center p-5 border-b"
              >
                <td className="flex-1 justify-between items-center">
                  <div className="bg-[#98B299] size-14 mx-auto animate-pulse rounded-full"></div>
                </td>

                <td className="flex-1 font-semibold text-[#5D7E5F]">
                  <div className="w-2/3 h-6 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
                </td>

                <td className="flex-1">
                  <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
                </td>

                <td className="flex-1">
                  <div className="w-2/3 h-4 bg-[#98B299] mx-auto animate-pulse rounded-lg"></div>
                </td>
              </tr>
            ))
          ) : loadedProducts?.data?.length > 0 ? (
            loadedProducts?.data?.slice(0, 3).map((product: TProduct) => (
              <tr className="flex justify-between items-center text-[#808080] text-center p-5 border-b">
                <td className="flex-1 justify-between items-center">
                  <img
                    src={product?.images[0]}
                    className="size-14 mx-auto p-[2px] border-2 border-[#5D7E5F] rounded-full"
                  ></img>
                </td>

                <td className="flex-1 font-semibold text-[#5D7E5F]">
                  {product?.title}
                </td>

                <td className="flex-1">${product?.price}</td>

                <td className="flex-1">{product?.stock}</td>
              </tr>
            ))
          ) : (
            <NoData text={"No Products Found"}></NoData>
          )}
        </tbody>
      </table>

      <Button
        className="group bg-white text-[#5D7E5F] text-lg rounded-full my-6 mx-auto hover:bg-transparent"
        onClick={() => navigate("/admin-dashboard/products")}
      >
        View All Plants
        <FaArrowRightLong className="ml-2 group-hover:translate-x-2 transition-all" />
      </Button>
    </div>
  );
};

export default ProductOverview;
