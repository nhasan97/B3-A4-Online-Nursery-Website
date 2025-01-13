import Loading from "@/components/shared/Loading";
import { TProduct } from "@/types/product.type";
import ProductCard from "../../ProductsPageAndManagement/ProductCard";
import NoData from "@/components/shared/NoData";

const YouMayAlsoLikeSection = ({
  loadingProducts,
  loadingNumberOfProducts,
  products,
  loadedId,
}: {
  loadingProducts: boolean;
  loadingNumberOfProducts: boolean;
  products: TProduct[];
  loadedId: string;
}) => {
  return (
    <div>
      <h3 className="text-[#505050] text-2xl font-semibold">
        You May Also Like
      </h3>

      {loadingProducts || loadingNumberOfProducts ? (
        <Loading></Loading>
      ) : products?.length > 0 ? (
        <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 my-5 overflow-y-auto">
          {products
            .filter((product: TProduct) => product._id !== loadedId)
            .map((product: TProduct) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      ) : (
        <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default YouMayAlsoLikeSection;
