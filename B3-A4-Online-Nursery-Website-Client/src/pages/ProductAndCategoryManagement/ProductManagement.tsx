import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import AddProductModal from "@/components/productManagement/AddProductModal";
import MobileView from "@/components/productManagement/MobileView/MobileView";
import TabPCView from "@/components/productManagement/TabPCView/TabPCView";
import Title from "@/components/shared/Title";

import { Helmet } from "react-helmet-async";

const ProductManagement = () => {
  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Products</title>
        </Helmet>

        <Title title={"Products"}></Title>

        <div className="w-full flex justify-between items-center">
          <AddProductModal></AddProductModal>
        </div>

        {/*tab pc view */}
        <TabPCView />

        {/* mobile view */}
        <MobileView />
      </DashboardContainer>
    </div>
  );
};

export default ProductManagement;
