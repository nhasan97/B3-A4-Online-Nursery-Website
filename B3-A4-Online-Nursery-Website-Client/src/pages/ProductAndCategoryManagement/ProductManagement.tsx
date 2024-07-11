import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import AddProductModal from "@/components/productManagement/AddProductModal";
import MobileView from "@/components/productManagement/MobileView/MobileView";
import TabPCView from "@/components/productManagement/TabPCView/TabPCView";
import productApi from "@/redux/api/ProductApi";
import { Helmet } from "react-helmet-async";

const ProductManagement = () => {
  const { isLoading: loadingProducts, data: products } =
    productApi.useGetProductsQuery(undefined);

  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Products</title>
        </Helmet>

        <div className="w-full flex justify-between">
          <AddProductModal></AddProductModal>
        </div>

        {/*tab pc view */}
        <TabPCView loadingProducts={loadingProducts} products={products} />

        {/* mobile view */}
        <MobileView loadingProducts={loadingProducts} products={products} />
      </DashboardContainer>
    </div>
  );
};

export default ProductManagement;
