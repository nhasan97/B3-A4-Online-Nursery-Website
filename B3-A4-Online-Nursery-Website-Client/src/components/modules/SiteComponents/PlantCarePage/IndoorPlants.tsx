import SiteTitle from "../../../shared/SiteTitle";

const IndoorPlants = () => {
  return (
    <div className="w-full h-full flex flex-col-reverse xl:flex-row 2xl:flex-col-reverse gap-24 xl:gap-0 overflow-y-auto">
      <div className="w-full xl:w-1/2 2xl:w-full h-full flex flex-col justify-center gap-6 md:p-5">
        <SiteTitle title="Indoor Plant Care" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full md:col-span-1 flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg">
            <img
              src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737650799/water_mzb4wc.png"
              className="size-14 md:size-16"
            />

            <h3 className="text-xl md:text-2xl">Boost Humidity</h3>

            <p className="text-[#757575] text-base">
              Pebble tray or humidifier.
            </p>
          </div>

          <div className="md:col-span-1 flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg">
            <img
              src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737650799/eco_s49pl0.png"
              className="size-14 md:size-16"
            />

            <h3 className="text-xl md:text-2xl">Rotate Weekly</h3>

            <p className="text-[#757575] text-base">
              Ensure even light exposure.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg">
            <img
              src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737650799/humidifier_v1fmhy.png"
              className="size-14 md:size-16"
            />

            <h3 className="text-xl md:text-2xl">Clean & Green</h3>

            <p className="text-[#757575] text-base">
              Wipe leaves to remove dust.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full xl:w-1/2 2xl:w-full h-full">
        <img
          src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476080/depositphotos_185171504-stock-photo-various-beautiful-green-plants-pots_lwf6vl.webp"
          alt=""
          className="w-full h-full bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
        />
      </div>
    </div>
  );
};

export default IndoorPlants;
