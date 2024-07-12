import Banner from "@/components/Home/Banner";
import CategorySection from "@/components/Home/CategorySection/CategorySection";
import ImageGallery from "@/components/Home/ImageGallery";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Blooms & Beyond | Home</title>
      </Helmet>

      <Banner />
      <CategorySection />
      <ImageGallery />
    </div>
  );
};

export default Home;
