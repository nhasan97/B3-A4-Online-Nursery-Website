import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import MobileView from "@/components/modules/CustomerComponents/WhishListPage/MobileView/MobileView";
import TabPCView from "@/components/modules/CustomerComponents/WhishListPage/TabPCView/TabPCView";
import WishlistBrowser from "@/components/modules/CustomerComponents/WhishListPage/WishlistBrowser";
import Pagination from "@/components/shared/Pagination";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useWishlistContext from "@/hooks/useWishlistContext";
import { TWishlistContext } from "@/types/wishlist.type";
import { Helmet } from "react-helmet-async";

const WhishListPage = () => {
  const {
    searchTerm,
    setSearchTerm,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,

    loadingWishlistItems,
    wishlistItems,
    wishlistItemCount,
  } = useWishlistContext() as TWishlistContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Orders</title>
        </Helmet>

        <div className="w-full h-full flex flex-col justify-between gap-3">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/user-dashboard/user-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Wishlist</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* browser */}
          <WishlistBrowser
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/*tab pc view */}
          <TabPCView
            loadingWishlistItems={loadingWishlistItems}
            wishlistItems={wishlistItems}
          />

          {/* mobile view */}
          <MobileView
            loadingWishlistItems={loadingWishlistItems}
            wishlistItems={wishlistItems}
          />

          {/* pagination */}
          <Pagination
            loadingDataLength={loadingWishlistItems}
            dataLength={wishlistItemCount}
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

export default WhishListPage;
