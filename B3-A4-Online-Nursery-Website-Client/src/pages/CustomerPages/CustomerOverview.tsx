import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import MessagesOverview from "@/components/modules/AdminCustomerCommonComponents/MessagesOverview";
import OrderOverview from "@/components/modules/AdminCustomerCommonComponents/OrderOverview";
import Title from "@/components/shared/Title";
import { Helmet } from "react-helmet-async";

const CustomerOverview = () => {
  return (
    <div className="">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Overview</title>
        </Helmet>
        <div className="w-full min-h-screen space-y-6">
          <Title title={"Overview"}></Title>

          <OrderOverview />

          <MessagesOverview caller={"customer-received"} />
        </div>
      </DashboardContainer>
    </div>
  );
};

export default CustomerOverview;
