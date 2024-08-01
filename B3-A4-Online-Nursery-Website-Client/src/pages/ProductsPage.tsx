import Container from "@/components/layouts/rootLayout/Container";
import ProductCard from "@/components/ProductsPageAndListSection/ProductCard";
import Loading from "@/components/shared/Loading";
import NoData from "@/components/shared/NoData";
import SiteTitle from "@/components/shared/SiteTitle";
import { TProduct, TProductContext } from "@/types/product.type";
import "../components/cssStyles/ProductPage.css";
import Browser from "@/components/ProductsPageAndListSection/Browser";
import useProductContext from "@/hooks/useProductContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ProductsContainer from "@/components/ProductsPageAndListSection/ProductsContainer";
import { GrNext } from "react-icons/gr";

const ProductsPage = () => {
  const loadedCategory = useParams();

  let category = "";
  if (loadedCategory) {
    category = loadedCategory.category as string;
  }

  const { loadingProducts, products, setCategoryToLoad, setItemsPerPage } =
    useProductContext() as TProductContext;

  useEffect(() => {
    setCategoryToLoad(category);
    setItemsPerPage(5);
  }, [category, setCategoryToLoad, setItemsPerPage]);

  return (
    <div className="w-full h-full">
      <Container>
        <div className="w-full h-screen flex flex-col items-center">
          {/* <SiteTitle title={"Products"}></SiteTitle> */}

          <p className="w-full h-[5%] flex items-center text-left text-[#757575]">
            <span>Home</span> <GrNext></GrNext>
            <span className=" font-medium">Products </span>
          </p>

          {/* browser */}
          {/* <Browser></Browser> */}

          <ProductsContainer>
            {loadingProducts ? (
              <Loading></Loading>
            ) : products?.length > 0 ? (
              <div className="w-full h-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 my-6 overflow-y-auto">
                {products.map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <NoData text={"No Products Found"}></NoData>
            )}
          </ProductsContainer>
        </div>
      </Container>
    </div>
  );
};

export default ProductsPage;
