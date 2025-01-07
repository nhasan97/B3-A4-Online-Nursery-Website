import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import MessagesOverview from "@/components/modules/AdminCustomerCommonComponents/MessagesOverview";
import OrderOverview from "@/components/modules/AdminCustomerCommonComponents/OrderOverview";
import Loading from "@/components/shared/Loading";
import Title from "@/components/shared/Title";
import useWishlistContext from "@/hooks/useWishlistContext";
import { TWishlistContext } from "@/types/wishlist.type";
import { Helmet } from "react-helmet-async";

const CustomerOverview = () => {
  const { loadingWishlistItems, wishlistItemCount } =
    useWishlistContext() as TWishlistContext;

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Overview</title>
        </Helmet>
        <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
          <Title title={"Overview"}></Title>

          <OrderOverview />

          <div className="w-full h-full flex flex-col-reverse md:flex-row gap-6">
            <div className="flex-1 bg-white w-full h-[80%] bg-[url(../public/customerOverviewWishlistBg.png)] bg-no-repeat bg-center bg-cover rounded-lg">
              {loadingWishlistItems ? (
                <Loading />
              ) : (
                <div className="w-full h-full flex flex-col xl:flex-row 2xl:flex-col justify-center items-center 2xl:gap-12 p-5">
                  <i className="fa-solid fa-heart text-[#98b299] text-4xl xl:text-9xl"></i>

                  <div className="text-center space-y-3">
                    <p className="text-2xl xl:text-7xl">{wishlistItemCount}</p>
                    <p className="text-base xl:text-2xl text-[#757575]">
                      Item(s) are in Wishlist
                    </p>
                  </div>
                </div>
              )}
            </div>
            <MessagesOverview caller={"customer-received"} />
          </div>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CustomerOverview;
