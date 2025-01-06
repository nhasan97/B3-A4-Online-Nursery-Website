import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/modules/SiteComponents/Checkout/CheckoutForm";
import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";

const CheckoutPage = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_Publishable_Key);

  return (
    <div className="w-full h-full">
      <Container>
        <div className="sm:w-2/3 h-full mx-auto flex flex-col gap-10">
          <SiteTitle title={"Checkout"}></SiteTitle>

          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPage;
