import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import MobileView from "@/components/modules/AdminCustomerCommonComponents/OrderManagement/MobileView/MobileView";
import OrderBrowser from "@/components/modules/AdminCustomerCommonComponents/OrderManagement/OrderBrowser";
import TabPCView from "@/components/modules/AdminCustomerCommonComponents/OrderManagement/TabPCView/TabPCView";
import Pagination from "@/components/shared/Pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import orderApi from "@/redux/api/orderApi";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/auth.type";
import { verifyToken } from "@/utils/verifyToken";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const OrderManagement = () => {
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading: loadingOrders, data: loadedOrders } =
    orderApi.useGetAllOrdersQuery({
      searchTerm,
      currentPage,
      itemsPerPage,
      userId: (user as TUser)?.id,
    });

  const { isLoading: loadingOrdersCount, data: ordersCount } =
    orderApi.useGetAllOrdersCountQuery((user as TUser)?.id);

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Orders</title>
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
                  <BreadcrumbPage>Orders</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <OrderBrowser
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            searchBarText={
              "Search by order id, customer's name or email & order status"
            }
          />

          {/*tab pc view */}
          <TabPCView
            loadingOrdersCount={loadingOrdersCount}
            loadingOrders={loadingOrders}
            orders={loadedOrders?.data}
            caller={"admin"}
          />

          {/* mobile view */}
          <MobileView
            loadingOrdersCount={loadingOrdersCount}
            loadingOrders={loadingOrders}
            orders={loadedOrders?.data}
            caller={"admin"}
          />

          {/* </Pagination> */}
          <Pagination
            loadingDataLength={loadingOrdersCount}
            dataLength={ordersCount?.data}
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

export default OrderManagement;
