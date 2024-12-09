import Container from "@/components/layouts/rootLayout/Container";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center gap-3 text-center p-20 bg-[url('https://i.ibb.co.com/fG0PNfY/Serene-Indoor-Botanical-Corner-Vibrant-Plant-Background-HD.webp')] bg-[#00000077] bg-blend-overlay bg-cover bg-no-repeat bg-center bg-fixed">
        <h1 className=" text-white text-3xl md:text-[40px] lg:text-[50px] font-bold leading-[40px] md:leading-[55px] lg:leading-[70px]">
          Bringing Nature Home
        </h1>

        <p className="text-white text-2xl">Welcome to Blooms & Beyond</p>

        <p className="text-[#c0c0c0] ">
          where we cultivate not just plants but also happiness, health, and a
          touch of nature for every home.
        </p>

        <Button
          className="bg-white text-[#5D7E5F] text-xl rounded-full"
          onClick={() => navigate("/all-products")}
        >
          Explore Our Plants
          <RiArrowRightLine />
        </Button>
      </div>

      <Container>
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 pt-10 lg:pt-20 pb-5 lg:pb-10">
          <div className="w-full lg:w-1/2">
            <img
              src="https://i.ibb.co.com/HCbhkj4/images-6.jpg"
              alt=""
              className="w-full h-full"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h1 className="text-center text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-3 md:mb-6">
              Who We Are
            </h1>

            <p className="text-[#969696] text-justify">
              At Blooms & Beyond, we are passionate about plants and their power
              to transform spaces and lives. Founded in 2023, our mission is to
              bring a bit of nature to every corner of your home, office, or
              garden. Whether you’re a seasoned plant enthusiast or just
              starting your green journey, we’re here to help every step of the
              way.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-6 py-5 lg:py-10">
          <h1 className="text-center text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold md:mb-6">
            What We Offer
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            <div className="bg-[#b0c3b148] w-full p-1 space-y-3 rounded-3xl border">
              <img
                src="https://i.ibb.co.com/SJ2MXqy/istockphoto-1280008207-612x612.jpg"
                alt=""
                className="w-full h-[200px] object-fill object-center rounded-[20px]"
              />

              <div className="flex flex-col justify-center items-center gap-2 px-2 py-3">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Healthy Plants to Your Doorstep
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  From vibrant flowering plants to low-maintenance succulents,
                  we provide a wide range of options carefully nurtured to
                  thrive.
                </p>
              </div>
            </div>

            <div className="bg-[#b0c3b148] w-full p-1 space-y-3 rounded-3xl border">
              <img
                src="https://i.ibb.co.com/KzZvg02/hands-holding-seedling-eggshells-montessori-260nw-1634965723.jpg"
                alt=""
                className="w-full h-[200px] object-fill object-center rounded-[20px]"
              />
              <div className="flex flex-col justify-center items-center gap-2 px-2 py-3">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Eco-Friendly Solutions
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  We believe in sustainability, using biodegradable pots,
                  natural fertilizers, and environmentally friendly practices.
                </p>
              </div>
            </div>

            <div className="bg-[#b0c3b148] w-full p-1 space-y-3 rounded-3xl border">
              <img
                src="https://i.ibb.co.com/tMCNrZp/feature-3-scaled.jpg"
                alt=""
                className="w-full h-[200px] object-fill object-center rounded-[20px]"
              />

              <div className="flex flex-col justify-center items-center gap-2 px-2 py-3">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Expert Care Tips
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  Our team of plant enthusiasts shares personalized care advice
                  to ensure your plants grow happy and healthy.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-6 py-5 lg:py-10">
          <h1 className="text-center text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold md:mb-6">
            Why Choose Us
          </h1>

          <div className="flex flex-col gap-12 text-center">
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
              <img
                src="https://i.ibb.co.com/hH8hBzy/service.png"
                alt=""
                className="size-fit md:size-[200px] bg-[#b0c3b148] p-2 rounded-full"
              />
              <div className="max-w-[620px] space-y-3 p-0 md:p-5">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Quality Guaranteed
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  Every plant is handpicked and inspected before delivery to
                  ensure it meets our quality standards.
                </p>
              </div>
            </div>

            <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center gap-2 md:gap-6">
              <div className="max-w-[620px] space-y-3 p-0 md:p-5">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Affordable Prices
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  We believe that greenery should be accessible to everyone,
                  offering competitive prices without compromising quality.
                </p>
              </div>{" "}
              <img
                src="https://i.ibb.co.com/gDXWHy6/price-down.png"
                alt=""
                className="size-fit md:size-[200px] bg-[#b0c3b148] p-2 rounded-full"
              />
            </div>

            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
              <img
                src="https://i.ibb.co.com/QF3R2Zw/customer-service.png"
                alt=""
                className="size-fit md:size-[200px] bg-[#b0c3b148] p-2 rounded-full"
              />
              <div className="max-w-[620px] space-y-3 p-0 md:p-5">
                <h1 className="text-[#202634] text-base md:text-xl font-medium">
                  Support at Every Step
                </h1>
                <p className="text-[#757575] text-sm md:text-base">
                  From plant selection to aftercare, our experts are available
                  to assist you whenever you need help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="w-full flex flex-col justify-center items-center gap-3 text-center p-10 md:p-20 bg-[url('https://i.ibb.co.com/Pj0Q1JJ/terrace-with-potted-plants-and-flowers-free-photo.jpg')] bg-[#00000077] bg-blend-overlay bg-cover bg-no-repeat bg-center bg-fixed">
        <div className="bg-white w-full lg:w-1/2 p-5 rounded-lg">
          <h1 className="text-center text-[#757575] text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-3 md:mb-6">
            Our Vision
          </h1>

          <p className="text-[#969696] text-justify">
            We envision a world where homes are filled with lush greenery,
            people are closer to nature, and urban spaces are transformed into
            vibrant sanctuaries.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
