import MainLogo from "@/components/shared/MainLogo";
import Container from "../Container";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#547256] py-10">
      <Container>
        <footer className="w-full flex flex-col lg:flex-row justify-between items-center">
          <div className="space-y-3 pr-5 pb-5">
            <MainLogo caller="f"></MainLogo>
            <p className="text-[#f1f1f1] text-base leading-6 text-justify">
              Blooms & Beyond is your go-to online nursery for a diverse
              selection of vibrant plants, gardening supplies, and expert
              advice.
            </p>

            <Button
              className="bg-white text-[#5D7E5F] text-lg rounded-full"
              onClick={() => navigate("/about-page")}
            >
              Learn More
              <RiArrowRightLine />
            </Button>
          </div>

          <div className="w-full grid grid-cols-1 lg:grid-cols-8 gap-6">
            <div className="h-full lg:col-span-1 bg-white text-[#202634de] text-2xl flex lg:flex-col justify-center lg:justify-between items-center gap-3 py-6 rounded-xl">
              <IoLogoFacebook />
              <RiInstagramFill />
              <IoLogoTwitter />
              <IoLogoPinterest />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-1">
              <p className="ft text-white text-lg mb-2 relative">
                Customer Service
              </p>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Contact Us
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Shipping & Delivery
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Returns & Refunds
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                FAQs
              </Link>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-1">
              <p className="ft text-white text-lg mb-2 relative">Quick Links</p>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Shop All Plants{" "}
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                New Arrivals{" "}
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Best Sellers
              </Link>
              <Link to="" className="text-[#f1f1f1] text-base hover:underline">
                Plant Care Tips
              </Link>
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div>
                <p className="ft text-white text-lg mb-2 relative">
                  Subscribe to Our Newsletter
                </p>
                <p className="text-[#f1f1f1] text-base leading-6 text-justify">
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
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
