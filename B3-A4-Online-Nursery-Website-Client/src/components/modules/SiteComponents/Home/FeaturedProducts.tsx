import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/modules/ProductsPageAndManagement/ProductCard";
import NoData from "@/components/shared/NoData";
import SiteTitle from "@/components/shared/SiteTitle";
import { TProduct } from "@/types/product.type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import "../../../cssStyles/Tab.css";
import ProductCardSkeleton from "../../ProductsPageAndManagement/ProductCardSkeleton";
import productApi from "@/redux/api/ProductApi";

const FeaturedProducts = () => {
  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery({
      searchTerm: "",
      categoryToLoad: "",
      sort: "",
      currentPage: 0,
      itemsPerPage: 12,
    });

  const navigate = useNavigate();

  return (
    <div
      id="Featured Products"
      className="w-full h-full py-10 my-10 md:my-20 relative"
    >
      <Container>
        <div className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-12">
          <img
            src={
              "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737471189/featured_zwzssb.webp"
            }
            loading="lazy"
            className="w-2/3 sm:w-1/2 md:w-[60%] xl:w-1/2 2xl:w-1/4 absolute top-0 translate-y-[-90%]"
          />
          <SiteTitle title={"Featured Plants"}></SiteTitle>

          <Tabs defaultValue="featured" className="flex flex-col items-center ">
            <TabsList className="TabsList bg-white px-2">
              <TabsTrigger className="TabsTrigger bg-black" value="featured">
                Featured
              </TabsTrigger>
              <TabsTrigger className="TabsTrigger" value="newArrivals">
                New Arrivals
              </TabsTrigger>
              <TabsTrigger className="TabsTrigger" value="bestSeller">
                Best Seller
              </TabsTrigger>
            </TabsList>

            <TabsContent value="featured">
              {loadingProducts ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : products?.data?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products?.data?.slice(0, 4).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>

            <TabsContent value="newArrivals">
              {loadingProducts ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : products?.data?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products?.data?.slice(4, 8).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>

            <TabsContent value="bestSeller">
              {loadingProducts ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))}
                </div>
              ) : products?.data?.length > 0 ? (
                <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 my-5 overflow-y-auto">
                  {products?.data?.slice(8, 12).map((product: TProduct) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <NoData text={"No Products Found"}></NoData>
              )}
            </TabsContent>
          </Tabs>

          <Button
            className="bg-[#5D7E5F] text-white text-base sm:text-lg rounded-full -mt-6"
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
