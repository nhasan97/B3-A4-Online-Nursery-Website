import Container from "../layouts/rootLayout/Container";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Title from "@/components/shared/Title";

const images = [
  "https://i.ibb.co/YRFRdZ7/senior-portrait-photographers-emily-brunner-31.jpg",
  "https://i.ibb.co/Gv6zKvy/Individual-Personality-Portraits-Petruzzo-Photography-2022-74-scaled.webp",
  "https://i.ibb.co/5vcPkMQ/Individual-Personality-Portraits-Petruzzo-Photography-2022-06-scaled.webp",
  "https://i.ibb.co/4MK4HsZ/individual.jpg",
  "https://i.ibb.co/bKBJy3b/08-01-Individual-Membership-1206170677.jpg",
  "https://i.ibb.co/KFFg7f3/technology-is-critical-to-compete-in-todays-marketplace.jpg",
  "https://i.ibb.co/Y0C7n6J/individual-contributor-woman-talking-at-desk.webp",
  "https://i.postimg.cc/BbK80zxC/images.jpg",
  "https://i.ibb.co/BjysQ0n/images-2.jpg",
  "https://i.postimg.cc/23N18xGN/download-4.jpg",
  "https://i.postimg.cc/MZNrxrkf/download-3.jpg",
  "https://i.postimg.cc/xTmpdyYx/download-2.jpg",
  "https://i.postimg.cc/CxVPnBxF/download-1.jpg",
  "https://i.postimg.cc/9fmL169K/download.jpg",
  "https://i.postimg.cc/Nj7N6sKR/632-05400930en-Masterfile.jpg",
  "https://i.postimg.cc/JhpPFpcn/20161214164224-Getty-Images-533978993.jpg",
  "https://i.postimg.cc/sXzH7F2M/images-2.jpg",
  "https://i.postimg.cc/MTYPYscd/images-1.jpg",
];

const ImageGallery = () => {
  return (
    <div>
      <Container>
        <Title title={"Image Gallery"}></Title>

        <div className="my-5 rounded-lg border-2 overflow-hidden">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 5 }}
          >
            <Masonry gutter="24px">
              {images.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  style={{ width: "100%", display: "block" }}
                  alt=""
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </Container>
    </div>
  );
};

export default ImageGallery;
