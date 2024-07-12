import Loading from "@/components/shared/Loading";
import MobileViewProductCard from "./MobileViewProductCard";
import NoData from "@/components/shared/NoData";
import productApi from "@/redux/api/ProductApi";
import { TProduct } from "@/types/product.type";

const MobileView = () => {
  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery(undefined);

  return (
    <div className="grid grid-cols-1 gap-3 sm:hidden w-full h-[80%] overflow-y-auto rounded-lg">
      {loadingProducts ? (
        <Loading></Loading>
      ) : products!.data?.length > 0 ? (
        products!.data?.map((product: TProduct) => (
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
