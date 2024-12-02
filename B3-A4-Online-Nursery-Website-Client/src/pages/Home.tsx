import FAQSection from "@/components/Home/FAQSection/FAQSection";
import Banner from "@/components/Home/Banner";
import BlogSection from "@/components/Home/BlogSection/BlogSection";
import CategorySection from "@/components/Home/CategorySection/CategorySection";
import CustomerReviewSection from "@/components/Home/CustomerReviewSection/CustomerReviewSection";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import HowToOrder from "@/components/Home/HowToOrder/HowToOrder";
import ImageGallery from "@/components/Home/ImageGallery/ImageGallery";
import SpecialOfferSection from "@/components/Home/SpecialOfferSection/SpecialOfferSection";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Blooms & Beyond | Home</title>
      </Helmet>

      <Banner />
      <CategorySection />
      <FeaturedProducts />
      <SpecialOfferSection />
      <CustomerReviewSection />
      <HowToOrder />
      <ImageGallery />
      <BlogSection />
      <FAQSection />
    </div>
  );
};

export default Home;
