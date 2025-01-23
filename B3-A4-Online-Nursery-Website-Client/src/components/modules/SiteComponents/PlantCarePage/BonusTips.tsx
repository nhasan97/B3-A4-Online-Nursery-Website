import SiteTitle from "../../../shared/SiteTitle";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";

const BonusTips = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="w-full h-[10%]">
        <SiteTitle title="Bonus Tip" />
      </div>

      <div className="w-full lg:w-1/2 mx-auto h-[10%] space-y-3">
        <p className="ft text-[#757575] text-lg">
          Subscribe to our newsletter for seasonal care tips tailored to your
          plants!
        </p>

        <div className="relative">
          <Input type="text" placeholder="Your Email"></Input>
          <Button className="bg-[#98B299] rounded-full absolute top-0 right-0">
            Subscribe
          </Button>
        </div>
      </div>

      <div className="w-full h-[70%]">
        <img
          src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476082/bonustip-bg_ggtisp.webp"
          alt=""
          className="h-full mx-auto"
        />
      </div>
    </div>
  );
};

export default BonusTips;
