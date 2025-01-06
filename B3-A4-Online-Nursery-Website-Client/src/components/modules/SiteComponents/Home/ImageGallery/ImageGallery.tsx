import Container from "../../../../layouts/rootLayout/Container";
import SiteTitle from "../../../../shared/SiteTitle";
import Masonry from "./Masonry";

const images = [
  {
    path: "https://i.ibb.co/wygztjZ/10-most-beautiful-plants-in-the-world.jpg",
    name: "Bleeding Heart",
  },
  {
    path: "https://i.ibb.co/mhP6gP5/images-3.jpg",
    name: "Blue Agave",
  },
  {
    path: "https://i.ibb.co/jrHfNTh/fern-leaf-roll-nature-preview.jpg",
    name: "Fern Rollup",
  },
  {
    path: "https://i.ibb.co/XVnzg41/1409fa55f66e24fdd7df383fce42e0d1.jpg",
    name: "lotus",
  },
  {
    path: "https://i.ibb.co/rf52NpB/get-to-know-most-popular-houseplants-on-pinterest-instagram-section-9.jpg",
    name: "Ficus Elastica",
  },
  {
    path: "https://i.ibb.co/C1sDyLk/57f83ff5ae182c8c982843138de4a487.jpg",
    name: "Monstera",
  },
  {
    path: "https://i.ibb.co/CKcY10F/cerulean-splendor-mesmerizing-bluey-flower-260nw-2468261027.webp",
    name: "Blue Dahlia",
  },
  {
    path: "https://i.ibb.co/99Zxkws/ai-generated-a-mesmerizing-macro-capture-of-a-green-succulent-plant-free-photo.jpg",
    name: "Green Succulent",
  },
  {
    path: "https://i.ibb.co/LPP2f5c/a00eae159337987e3ea9b0f56ede72fd.jpg",
    name: "Tulip",
  },
  {
    path: "https://i.ibb.co/LvvHKDs/images-5.jpg",
    name: "Orange Daisy",
  },
  {
    path: "https://i.ibb.co/GV4LLJ6/IMG-1056.jpg",
    name: "Hibiscus",
  },
  {
    path: "https://i.ibb.co/JH8dLM2/images-4.jpg",
    name: "Parrots Feather",
  },
];

const ImageGallery = () => {
  return (
    <div
      id="gallery"
      className="w-full h-full py-10 my-10 md:my-20 bg-[url(../public/leaf2.png)] bg-no-repeat bg-right-top bg-contain bg-fixed"
    >
      <Container>
        <div className="w-full h-full flex flex-col  gap-6 sm:gap-12">
          <SiteTitle title={"Image Gallery"}></SiteTitle>

          <Masonry images={images} gap={5}></Masonry>
        </div>
      </Container>
    </div>
  );
};

export default ImageGallery;
