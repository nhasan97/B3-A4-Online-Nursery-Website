import Banner from "@/components/modules/SiteComponents/Home/Banner";
import BlogSection from "@/components/modules/SiteComponents/Home/BlogSection/BlogSection";
import CategorySection from "@/components/modules/SiteComponents/Home/CategorySection/CategorySection";
import CustomerReviewSection from "@/components/modules/SiteComponents/Home/CustomerReviewSection/CustomerReviewSection";
import FAQSection from "@/components/modules/SiteComponents/Home/FAQSection/FAQSection";
import FeaturedProducts from "@/components/modules/SiteComponents/Home/FeaturedProducts";
import HowToOrder from "@/components/modules/SiteComponents/Home/HowToOrder/HowToOrder";
import ImageGallery from "@/components/modules/SiteComponents/Home/ImageGallery/ImageGallery";
import SpecialOfferSection from "@/components/modules/SiteComponents/Home/SpecialOfferSection/SpecialOfferSection";
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
