import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import MobileView from "@/components/modules/OrderManagement/MobileView/MobileView";
import TabPCView from "@/components/modules/OrderManagement/TabPCView/TabPCView";
import Title from "@/components/shared/Title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import orderApi from "@/redux/api/orderApi";
import { Helmet } from "react-helmet-async";

const OrderManagement = () => {
  const { isLoading: loadingOrders, data: orders } =
    orderApi.useGetAllOrdersQuery(undefined);

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Orders</title>
        </Helmet>

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

        <Title title={"Orders"}></Title>

        {/*tab pc view */}
        <TabPCView loadingOrders={loadingOrders} orders={orders?.data} />

        {/* mobile view */}
        <MobileView loadingOrders={loadingOrders} orders={orders?.data} />
      </DashboardContainer>
    </div>
  );
};

export default OrderManagement;
