import Container from "../../../../layouts/rootLayout/Container";
import SiteTitle from "../../../../shared/SiteTitle";
import Masonry from "./Masonry";

const images = [
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459496/BleedingHeart_dlb6fn.webp",
    name: "Bleeding Heart",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459490/BlueAgave_ghd9cf.webp",
    name: "Blue Agave",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459492/FernRollup_d6xugg.webp",
    name: "Fern Rollup",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459494/Lotus_lekftd.webp",
    name: "Lotus",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459491/FicusElastica_gnua1e.webp",
    name: "Ficus Elastica",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459495/Monstera_lvkgi4.webp",
    name: "Monstera",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459489/BlueDahlia_dbhwpt.webp",
    name: "Blue Dahlia",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459492/GreenSucculent_a57stx.webp",
    name: "Green Succulent",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459494/Tulip_md1xd0.webp",
    name: "Tulip",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459489/OrangeDaisy_r4ltm7.webp",
    name: "Orange Daisy",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459489/Hibiscus_coeazs.webp",
    name: "Hibiscus",
  },
  {
    path: "https://res.cloudinary.com/dcnktq9l2/image/upload/v1737459489/ParrotsFeather_q0tprh.webp",
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
