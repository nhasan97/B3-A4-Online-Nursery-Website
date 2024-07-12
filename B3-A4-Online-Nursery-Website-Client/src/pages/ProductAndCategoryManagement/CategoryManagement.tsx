import AddCategoryModal from "@/components/categoryManagement/AddCategoryModal";
import MobileView from "@/components/categoryManagement/MobileView/MobileView";
import TabPCView from "@/components/categoryManagement/TabPCView/TabPCView";
import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Title from "@/components/shared/Title";
import { Helmet } from "react-helmet-async";

const CategoryManagement = () => {
  return (
    <div className="h-screen">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Categories</title>
        </Helmet>

        <Title title={"Categories"}></Title>

        <div className="w-full flex justify-between items-center">
          <AddCategoryModal></AddCategoryModal>
        </div>

        {/*tab pc view */}
        <TabPCView />

        {/* mobile view */}
        <MobileView />
      </DashboardContainer>
    </div>
  );
};

export default CategoryManagement;
