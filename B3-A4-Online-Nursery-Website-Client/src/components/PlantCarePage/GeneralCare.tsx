import { GiWateringCan, GiFertilizerBag } from "react-icons/gi";
import SiteTitle from "../shared/SiteTitle";

const GeneralCare = () => {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row 2xl:flex-col">
      <div className="w-full xl:w-1/2 2xl:w-full h-full">
        <img
          src="https://i.ibb.co.com/wLpts57/pexels-karolina-grabowska-6640487.jpg"
          alt=""
          className="w-full h-full bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
        />
      </div>

      <div className="w-full xl:w-1/2  2xl:w-full h-full flex flex-col justify-center items-center gap-6 py-5 xl:pl-5">
        <SiteTitle title="General Plant Care Tips" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6">
          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <GiWateringCan className="text-[#5D7E5F] text-7xl" />

            <h3 className="text-2xl">Water Wisely</h3>

            <p className="text-[#757575] text-base">
              Room-temperature water, morning schedule.
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <GiFertilizerBag className="text-[#5D7E5F] text-7xl" />

            <h3 className="text-2xl">Feed Smart</h3>

            <p className="text-[#757575] text-base">
              Balanced fertilizer during growth season.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralCare;
