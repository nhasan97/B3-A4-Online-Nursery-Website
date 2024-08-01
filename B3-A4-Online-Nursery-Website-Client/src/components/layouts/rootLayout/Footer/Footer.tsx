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
    <div className="w-full h-full bg-[#547256] py-10">
      <Container>
        <footer className="w-full grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <MainLogo caller="f"></MainLogo>
            <p className="text-[#cecece] text-base leading-6 text-justify">
              Blooms & Beyond is your go-to online nursery for a diverse
              selection of vibrant plants, gardening supplies, and expert
              advice.
            </p>

            <Button className="bg-white text-[#5D7E5F] text-lg rounded-full">
              Learn More
              <RiArrowRightLine />
            </Button>
          </div>

          <div className="flex flex-col gap-1">
            <p className="ft text-white text-lg mb-2 relative">
              Customer Service
            </p>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Contact Us
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Shipping & Delivery
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Returns & Refunds
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              FAQs
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <p className="ft text-white text-lg mb-2 relative">Quick Links</p>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Shop All Plants{" "}
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              New Arrivals{" "}
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Best Sellers
            </Link>
            <Link to="" className="text-[#cecece] text-base hover:underline">
              Plant Care Tips
            </Link>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <p className="ft text-white text-lg mb-2 relative">
                Subscribe to Our Newsletter
              </p>
              <p className="text-[#cecece] text-base leading-6 text-justify">
                Get the latest updates, exclusive deals, and gardening tips
                delivered straight to your inbox.
              </p>
              <div className="relative mt-2">
                <Input type="text" placeholder="Your Email"></Input>
                <Button className="bg-[#98B299] rounded-full absolute top-0 right-0">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <p className="text-white text-lg mb-4">Connect with Us</p>
              <div className="flex justify-start items-center gap-3">
                <IoLogoFacebook className="text-2xl text-white" />
                <RiInstagramFill className="text-2xl text-white" />
                <IoLogoTwitter className="text-2xl text-white" />
                <IoLogoPinterest className="text-2xl text-white" />
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
