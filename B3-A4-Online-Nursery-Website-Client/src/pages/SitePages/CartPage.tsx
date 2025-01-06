import MobileView from "@/components/modules/SiteComponents/CartPage/MobileView/MobileView";
import TabPCView from "@/components/modules/SiteComponents/CartPage/TabPCView/TabPCView";
import Container from "@/components/layouts/rootLayout/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import useReloadWarner from "@/hooks/useReloadWarner";

const CartPage = () => {
  // useReloadWarner();

  return (
    <div className="w-full h-full ">
      <Container>
        <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Cart</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

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
