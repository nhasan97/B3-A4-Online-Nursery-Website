import productApi from "@/redux/api/ProductApi";
import Container from "../layouts/rootLayout/Container";
import SiteTitle from "../shared/SiteTitle";
import Loading from "../shared/Loading";
import ProductCard from "../ProductsPageAndListSection/ProductCard";
import NoData from "../shared/NoData";
import { TProduct } from "@/types/product.type";

const ProductList = () => {
  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery(undefined);

  return (
    <div className="w-full h-full py-10 my-20">
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-16">
          <SiteTitle title={"Product List"}></SiteTitle>

          {loadingProducts ? (
            <Loading></Loading>
          ) : products!.data?.length > 0 ? (
            <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-auto">
              {products!.data?.slice(0, 4).map((product: TProduct) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <NoData text={"No Products Found"}></NoData>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductList;
