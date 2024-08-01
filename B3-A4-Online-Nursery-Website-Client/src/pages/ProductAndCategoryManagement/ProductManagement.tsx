import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import AddProductModal from "@/components/productManagement/AddProductModal";
import MobileView from "@/components/productManagement/MobileView/MobileView";
import TabPCView from "@/components/productManagement/TabPCView/TabPCView";
import Browser from "@/components/ProductsPageAndListSection/Browser";
import ProductsContainer from "@/components/ProductsPageAndListSection/ProductsContainer";
import Title from "@/components/shared/Title";
import useProductContext from "@/hooks/useProductContext";
import { TProductContext } from "@/types/product.type";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const ProductManagement = () => {
  const {
    loadingProducts,
    products,
    setItemsPerPage,
    loadingNumberOfProducts,
    numberOfProducts,
  } = useProductContext() as TProductContext;

  // useEffect(() => {
  setItemsPerPage(numberOfProducts);
  // }, [numberOfProducts, setItemsPerPage]);

  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Products</title>
        </Helmet>

        <Title title={"Products"}></Title>

        {/* browser */}
        {/* <Browser></Browser> */}

        <ProductsContainer>
          <div className="w-full flex justify-between items-center">
            <AddProductModal></AddProductModal>
          </div>

          {/*tab pc view */}
          <TabPCView
            loadingProducts={loadingProducts}
            products={products}
            loadingNumberOfProducts={loadingNumberOfProducts}
          />

          {/* mobile view */}
          <MobileView
            loadingProducts={loadingProducts}
            products={products}
            loadingNumberOfProducts={loadingNumberOfProducts}
          />
        </ProductsContainer>
      </DashboardContainer>
    </div>
  );
};

export default ProductManagement;
