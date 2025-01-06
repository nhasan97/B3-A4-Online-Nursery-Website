import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import AddCategoryModal from "@/components/modules/AdminComponents/categoryManagement/AddCategoryModal";
import CategoryBrowser from "@/components/modules/AdminComponents/categoryManagement/CategoryBrowser";
import MobileView from "@/components/modules/AdminComponents/categoryManagement/MobileView/MobileView";
import TabPCView from "@/components/modules/AdminComponents/categoryManagement/TabPCView/TabPCView";
import Pagination from "@/components/shared/Pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useCategoryContext from "@/hooks/useCategoryContext";
import { TCategoryContext } from "@/types/category.type";
import { Helmet } from "react-helmet-async";

const CategoryManagement = () => {
  const {
    loadingCategoryCount,
    totalCategory,
    loadingCategories,
    categories,
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
  } = useCategoryContext() as TCategoryContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Categories</title>
        </Helmet>

        <div className="w-full h-full flex flex-col justify-between gap-6">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Categories</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
            <CategoryBrowser
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <AddCategoryModal></AddCategoryModal>
          </div>

          {/*tab pc view */}
          <TabPCView
            loadingCategories={loadingCategories}
            categories={categories}
          />

          {/* mobile view */}
          <MobileView
            loadingCategories={loadingCategories}
            categories={categories}
          />

          {/* </Pagination> */}
          <Pagination
            loadingDataLength={loadingCategoryCount}
            dataLength={totalCategory}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CategoryManagement;
