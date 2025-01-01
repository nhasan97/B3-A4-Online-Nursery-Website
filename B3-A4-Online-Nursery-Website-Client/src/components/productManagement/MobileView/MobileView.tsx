import MobileViewProductCard from "./MobileViewProductCard";
import NoData from "@/components/shared/NoData";
import { TProduct, TProductManagementProp } from "@/types/product.type";
import LazyLoadingProductCard from "./LazyLoadingProductCard";

const MobileView = ({
  loadingProducts,
  products,
  loadingNumberOfProducts,
}: TProductManagementProp) => {
  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingProducts || loadingNumberOfProducts ? (
        Array.from({ length: 10 }).map((_, index: number) => (
          <LazyLoadingProductCard index={index} />
        ))
      ) : products?.length > 0 ? (
        products?.map((product: TProduct) => (
          <MobileViewProductCard
            key={product._id}
            product={product}
          ></MobileViewProductCard>
        ))
      ) : (
        <NoData text={"No Products Found"}></NoData>
      )}
    </div>
  );
};

export default MobileView;
