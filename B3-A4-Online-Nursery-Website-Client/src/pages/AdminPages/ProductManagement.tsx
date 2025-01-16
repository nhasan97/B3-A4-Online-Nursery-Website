import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";

import useProductContext from "@/hooks/useProductContext";
import { TProductContext } from "@/types/product.type";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Pagination from "@/components/shared/Pagination";
import ProductBrowser from "@/components/modules/ProductsPageAndManagement/ProductBrowser";
import TabPCView from "@/components/modules/AdminComponents/productManagement/TabPCView/TabPCView";
import MobileView from "@/components/modules/AdminComponents/productManagement/MobileView/MobileView";
import { Button } from "@/components/ui/button";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ProductManagement = () => {
  const {
    loadingProducts,
    products,
    setItemsPerPage,
    loadingNumberOfProducts,
    numberOfProducts,
    setCurrentPage,
    itemsPerPage,
    currentPage,
  } = useProductContext() as TProductContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Products</title>
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
                  <BreadcrumbPage>Products</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* <ProductsContainer> */}
          <div className="w-full flex justify-between items-center gap-12">
            {/* browser */}
            <ProductBrowser caller={"ProductManagement"} />
            <Link to="/admin-dashboard/add-products">
              <Button className="bg-[#5D7E5F] text-base md:text-lg font-semibold space-x-2 rounded-full">
                <FaCirclePlus /> <p>Product</p>
              </Button>
            </Link>
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

          {/* </Pagination> */}
          <Pagination
            loadingDataLength={loadingNumberOfProducts}
            dataLength={numberOfProducts}
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

export default ProductManagement;
