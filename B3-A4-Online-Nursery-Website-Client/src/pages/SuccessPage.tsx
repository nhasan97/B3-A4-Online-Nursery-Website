import Container from "@/components/layouts/rootLayout/Container";
import successGif from "../assets/images/success.gif";
import SiteTitle from "@/components/shared/SiteTitle";

const SuccessPage = () => {
  return (
    <div className="w-full h-full">
      <Container>
        <div className="sm:w-2/3 h-full mx-auto flex flex-col gap-10">
          <SiteTitle title={"Order Placed Successfully"}></SiteTitle>
          <img src={successGif} alt="" className="w-full" />
        </div>
      </Container>
    </div>
  );
};

export default SuccessPage;
