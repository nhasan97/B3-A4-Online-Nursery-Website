import MainLogo from "@/components/shared/MainLogo";
import Container from "../Container";
import { Link } from "react-router-dom";
import {
  IoLogoFacebook,
  IoLogoPinterest,
  IoLogoTwitter,
} from "react-icons/io5";
import { RiInstagramFill, RiArrowRightLine } from "react-icons/ri";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../../../cssStyles/Footer.css";

const Footer = () => {
  return (
    <div className="bg-green-950">
      <Container>
        <footer className="w-full grid sm:grid-cols-2 lg:grid-cols-6 gap-6 py-6">
          <div className="col-span-2 space-y-3 lg:px-4 lg:border-r border-[#fcfcfc6b]">
            <MainLogo caller="f"></MainLogo>
            <p className="text-[#808080] text-base leading-6 text-justify">
              Blooms & Beyond is your go-to online nursery for a diverse
              selection of vibrant plants, gardening supplies, and expert
              advice.
            </p>

            <Button className="bg-white text-[#5D7E5F] rounded-full">
              Learn More
              <RiArrowRightLine />
            </Button>
          </div>

          <div className="flex flex-col gap-1 lg:px-4 lg:border-r border-[#467458]">
            <p className="ft text-[#757575] text-lg font-medium mb-2 relative">
              Customer Service
            </p>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Contact Us
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Shipping & Delivery
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Returns & Refunds
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              FAQs
            </Link>
          </div>

          <div className="flex flex-col gap-1 lg:px-4 lg:border-r border-[#467458]">
            <p className="ft text-[#757575] text-lg font-medium mb-2 relative">
              Quick Links
            </p>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Shop All Plants{" "}
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              New Arrivals{" "}
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Best Sellers
            </Link>
            <Link to="" className="text-[#808080] text-base hover:underline">
              Plant Care Tips
            </Link>
          </div>

          <div className="col-span-2 space-y-6">
            <div>
              <p className="ft text-[#757575] text-lg font-medium mb-2 relative">
                Subscribe to Our Newsletter
              </p>
              <p className="text-[#808080] text-base leading-6 text-justify">
                Get the latest updates, exclusive deals, and gardening tips
                delivered straight to your inbox.
              </p>
              <div className="relative mt-2">
                <Input type="text" placeholder="Your Email"></Input>
                <Button className="bg-[#5D7E5F] rounded-full absolute top-0 right-0">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <p className="text-[#757575] text-lg font-medium mb-4">
                Connect with Us
              </p>
              <div className="flex justify-start items-center gap-3">
                <IoLogoFacebook className="text-2xl text-[#5D7E5F]" />
                <RiInstagramFill className="text-2xl text-[#5D7E5F]" />
                <IoLogoTwitter className="text-2xl text-[#5D7E5F]" />
                <IoLogoPinterest className="text-2xl text-[#5D7E5F]" />
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
