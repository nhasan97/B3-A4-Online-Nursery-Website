import Container from "@/components/layouts/rootLayout/Container";
import SiteTitle from "@/components/shared/SiteTitle";
import howToOrder from "../../../assets/images/howToOrder.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowToOrder = () => {
  const navigate = useNavigate();

  return (
    <div className="py-10 my-10 md:my-20">
      <Container>
        <div className="w-full h-full flex flex-col gap-8 sm:gap-16">
          <SiteTitle title={"How to Order"}></SiteTitle>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex flex-col justify-center items-center gap-3 p-5 text-center">
                <div className="w-fit h-fit p-5 bg-[#5D7E5F] text-white rounded-full shadow-xl">
                  <p>01</p>
                </div>

                <h3 className="text-[#5D7E5F] text-xl font-semibold">
                  Choose Products
                </h3>

                <p className="text-[#757575]">
                  Select your favorite items and add them to your cart.
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-3 p-5 text-center">
                <div className="w-fit h-fit p-5 bg-[#5D7E5F] text-white rounded-full shadow-xl">
                  <p>02</p>
                </div>

                <h3 className="text-[#5D7E5F] text-xl font-semibold">
                  Place Order
                </h3>

                <p className="text-[#757575]">
                  Review your cart and confirm your order securely.
                </p>
              </div>
            </div>

            <div className="flex-1 flex justify-center items-center relative">
              <img src={howToOrder} alt="" />
              <Button
                className="bg-[#5D7E5F] text-white text-lg size-[120px] sm:size-[150px] md:size-[100px] lg:size-[150px] rounded-full absolute animate-pulse hover:animate-none"
                onClick={() => navigate("/all-products")}
              >
                Shop Now
              </Button>
            </div>

            <div className="flex-1 flex flex-col justify-between">
              <div className="flex flex-col justify-center items-center gap-3 p-5 text-center">
                <div className="w-fit h-fit p-5 bg-[#5D7E5F] text-white rounded-full shadow-xl">
                  <p>03</p>
                </div>

                <h3 className="text-[#5D7E5F] text-xl font-semibold">
                  Provide Shiping Address
                </h3>

                <p className="text-[#757575]">
                  Enter the address where you'd like your order delivered.
                </p>
              </div>

              <div className="flex flex-col justify-center items-center gap-3 p-5 text-center">
                <div className="w-fit h-fit p-5 bg-[#5D7E5F] text-white rounded-full shadow-xl">
                  <p>04</p>
                </div>

                <h3 className="text-[#5D7E5F] text-xl font-semibold">
                  Receive Order
                </h3>

                <p className="text-[#757575]">
                  Relax while we deliver your order promptly to your doorstep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default HowToOrder;
