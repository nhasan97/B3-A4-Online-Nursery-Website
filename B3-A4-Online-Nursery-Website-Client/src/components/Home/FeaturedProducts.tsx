import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/modules/ProductsPageAndListSection/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import SiteTitle from "@/components/shared/SiteTitle";
import { TProduct, TProductContext } from "@/types/product.type";
import "../cssStyles/ProductPage.css";
import plant from "../../assets/images/plant4.png";
import useProductContext from "@/hooks/useProductContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const FeaturedProducts = () => {
  const {
    loadingNumberOfProducts,
    numberOfProducts,
    setItemsPerPage,
    loadingProducts,
    products,
    resetBrower,
    resetPagination,
  } = useProductContext() as TProductContext;

  useEffect(() => {
    resetBrower();
    resetPagination();
    setItemsPerPage(numberOfProducts);
  }, [numberOfProducts, resetBrower, resetPagination, setItemsPerPage]);

  const navigate = useNavigate();

  return (
    <div
      id="Featured Products"
      className="w-full h-full py-10 my-10 md:my-20 relative"
    >
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-8 sm:gap-16">
          <img
            src={plant}
            alt=""
            className="w-2/3 sm:w-1/2 md:w-[60%] xl:w-1/2 2xl:w-1/4 absolute top-0 translate-y-[-90%]"
          />

          <SiteTitle title={"Featured Plants"}></SiteTitle>

          <Tabs defaultValue="featured" className="flex flex-col items-center">
            <TabsList>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newArrivals">New Arrivals</TabsTrigger>
              <TabsTrigger value="bestSeller">Best Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="featured">
              {loadingProducts || loadingNumberOfProducts ? (
                <Loading></Loading>
              ) : products?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products.slice(0, 4).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>

            <TabsContent value="newArrivals">
              {loadingProducts || loadingNumberOfProducts ? (
                <Loading></Loading>
              ) : products?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products.slice(4, 8).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>

            <TabsContent value="bestSeller">
              {loadingProducts || loadingNumberOfProducts ? (
                <Loading></Loading>
              ) : products?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products.slice(8, 12).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>
          </Tabs>

          <Button
            className="bg-[#5D7E5F] text-white text-lg"
            onClick={() => navigate("/all-products")}
          >
            View All Plants
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedProducts;
