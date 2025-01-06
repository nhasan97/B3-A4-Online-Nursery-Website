import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Title from "@/components/shared/Title";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
import { Helmet } from "react-helmet-async";

import AccountsOverview from "@/components/modules/AdminComponents/AdminOverview/AccountsOverview";
import OrderOverview from "@/components/modules/AdminCustomerCommonComponents/OrderOverview";
import MessagesOverview from "@/components/modules/AdminCustomerCommonComponents/MessagesOverview";
import ProductOverview from "@/components/modules/AdminComponents/AdminOverview/ProductOverview";
import SalesPurchaseExpanseOverview from "@/components/modules/AdminComponents/AdminOverview/SalesPurchaseExpanseOverview";

const AdminOverView = () => {
  return (
    <div className="">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Overview</title>
        </Helmet>
        {/* <div className="w-full">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin-dashboard/admin-overview">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>Customers</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div> */}

        <div className="w-full min-h-screen space-y-6 overflow-y-auto">
          <Title title={"Overview"}></Title>

          <AccountsOverview />

          <OrderOverview />

          <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center gap-6">
            <MessagesOverview caller={"admin-received"} />

            <ProductOverview />
          </div>

          <SalesPurchaseExpanseOverview />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AdminOverView;
