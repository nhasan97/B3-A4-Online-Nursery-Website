import Container from "@/components/layouts/rootLayout/Container";
import offer from "../../../../../assets/images/offer.png";
import "../../../../cssStyles/textPreview.css";

const SpecialOfferSection = () => {
  return (
    <div className="bg-[#547256] my-10 md:my-20 lg:bg-[url(../public/palm2.png)] bg-no-repeat bg-right-top bg-auto">
      <Container>
        <div className="w-full h-full flex flex-col md:flex-row gap-8 sm:gap-16">
          <div className="w-full md:w-1/2 h-full flex justify-center items-center bg-white px-5">
            <img src={offer} className="w-2/3 mx-auto my-auto" />
          </div>

          <div className="w-full md:w-1/2 flex flex-col justify-center items-center gap-6 p-5 text-center text-white">
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl">Enjoy</p>
            <h1 className="glowing-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              50% Sale!!!
            </h1>
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:leading-[60px]">
              On seasonal plants for the whole month
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SpecialOfferSection;
