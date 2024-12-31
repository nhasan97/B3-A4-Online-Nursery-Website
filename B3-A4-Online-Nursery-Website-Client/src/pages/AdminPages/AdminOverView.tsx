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

import AccountsOverview from "@/components/modules/AdminOverview/AccountsOverview";
import OrderOverview from "@/components/modules/AdminOverview/OrderOverview";
import MessagesOverview from "@/components/modules/AdminOverview/MessagesOverview";
import ProductOverview from "@/components/modules/AdminOverview/ProductOverview";
import SalesPurchaseExpanseOverview from "@/components/modules/AdminOverview/SalesPurchaseExpanseOverview";

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

        <div className="w-full min-h-screen space-y-6">
          <Title title={"Overview"}></Title>

          <AccountsOverview />

          <OrderOverview />

          <div className="w-full h-full flex flex-col xl:flex-row justify-between items-center gap-6">
            <MessagesOverview />

            <ProductOverview />
          </div>

          <SalesPurchaseExpanseOverview />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AdminOverView;
