import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/modules/SiteComponents/Checkout/CheckoutForm";
import Container from "@/components/layouts/rootLayout/Container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const CheckoutPage = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

  return (
    <div className="w-full h-full py-10">
      <Container>
        <div className="w-full min-h-screen 2xl:h-[calc(100vh-64px)]">
          <div className="w-full h-[5%]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Checkout</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="w-full h-full flex flex-col xl:flex-row gap-6 mt-6">
            {/* <div className="w-full xl:w-1/2 xl:h-screen 2xl:h-[95%] flex flex-col justify-center items-center gap-6 rounded-lg"></div> */}
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
