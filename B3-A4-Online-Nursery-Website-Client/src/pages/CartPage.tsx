import MobileView from "@/components/CartPage/MobileView/MobileView";
import TabPCView from "@/components/CartPage/TabPCView/TabPCView";
import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import useReloadWarner from "@/hooks/useReloadWarner";

const CartPage = () => {
  useReloadWarner();

  return (
    <div className="w-full h-full ">
      <Container>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
          <SiteTitle title={"Cart"}></SiteTitle>

          {/*tab pc view */}
          <TabPCView />

          {/* mobile view */}
          <MobileView />
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
