import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/ProductsPageAndListSection/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import SiteTitle from "@/components/shared/SiteTitle";
import productApi from "@/redux/api/ProductApi";
import { TProduct } from "@/types/product.type";

const ProductsPage = () => {
  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery(undefined);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Container>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
          <SiteTitle title={"Products"}></SiteTitle>

          {loadingProducts ? (
            <Loading></Loading>
          ) : products!.data?.length > 0 ? (
            <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6 overflow-y-auto border">
              {products!.data?.map((product: TProduct) => (
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

export default ProductsPage;
