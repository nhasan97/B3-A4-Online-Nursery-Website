import Container from "../layouts/rootLayout/Container";
import bgImg from "../../assets/images/bg1.png";
import { Button } from "../ui/button";
import { RiArrowRightLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { GiCheckMark } from "react-icons/gi";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-[#98b2992f]">
      <Container>
        <div className="w-full h-full flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-1/2 h-full text-center md:text-left space-y-6 p-5 md:p-10 border">
            <h1 className="text-[#5D7E5F] text-5xl font-semibold border">
              Bringing Nature Home
            </h1>

            <p className="text-[#757575] text-lg leading-6 text-justify">
              Blooms & Beyond is your go-to online nursery for ~
            </p>

            <div className="text-[#757575] text-lg leading-8">
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> A diverse
                selection of vibrant plants
              </p>
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> Gardening
                supplies
              </p>
              <p className="flex items-center">
                <GiCheckMark className="text-green-800 text-xl " /> And expert
                advice
              </p>
            </div>

            <Button
              className="bg-white text-[#5D7E5F] text-xl rounded-full"
              onClick={() => navigate("/products-page")}
            >
              Explore
              <RiArrowRightLine />
            </Button>
          </div>
          <div className="w-1/2 h-full bg-[#98b299a6] p-10">
            <img src={bgImg} alt="" className="w-full" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
