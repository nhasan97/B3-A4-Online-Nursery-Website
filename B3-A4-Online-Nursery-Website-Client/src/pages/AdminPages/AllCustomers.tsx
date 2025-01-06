import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import CustomerBrowser from "@/components/modules/AdminComponents/AllCustomers/CustomerBrowser";
import MobileView from "@/components/modules/AdminComponents/AllCustomers/MobileView/MobileView";
import TabPCView from "@/components/modules/AdminComponents/AllCustomers/TabPCView/TabPCView";
import Pagination from "@/components/shared/Pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import userApi from "@/redux/features/user/userApi";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const AllCustomers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const { isLoading: loadingCustomers, data: customers } =
    userApi.useGetAllUsersQuery({ searchTerm, currentPage, itemsPerPage });

  const { isLoading: loadingUsersCount, data: usersCount } =
    userApi.useGetAllUsersCountQuery(undefined);

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Customers</title>
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
                  <BreadcrumbPage>Customers</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <CustomerBrowser
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/*tab pc view */}
          <TabPCView
            loadingCustomers={loadingCustomers}
            customers={customers?.data}
          />

          {/* mobile view */}
          <MobileView
            loadingCustomers={loadingCustomers}
            customers={customers?.data}
          />

          {/* </Pagination> */}
          <Pagination
            loadingDataLength={loadingUsersCount}
            dataLength={usersCount?.data}
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

export default AllCustomers;
