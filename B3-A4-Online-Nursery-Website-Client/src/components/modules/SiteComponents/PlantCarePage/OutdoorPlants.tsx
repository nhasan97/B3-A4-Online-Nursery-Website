import SiteTitle from "../../../shared/SiteTitle";

const OutdoorPlants = () => {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row 2xl:flex-col">
      <div className="w-full xl:w-1/2 2xl:w-full h-full">
        <img
          src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476085/468326352_501045089619991_3440319891396866551_n_k1omew.webp"
          alt=""
          className="w-full h-full bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
        />
      </div>

      <div className="w-full xl:w-1/2  2xl:w-full h-full flex flex-col justify-center items-center gap-6 py-5 xl:pl-5">
        <SiteTitle title="Outdoor Plant Care" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6">
          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <img
              src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737650799/sprout_jgapaf.png"
              className="size-16"
            />
            <h3 className="text-2xl">Protect from Frost</h3>

            <p className="text-[#757575] text-base">
              Move plants indoors or cover them.
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <img
              src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737650799/mulch_mktqfh.png"
              className="size-16"
            />
            <h3 className="text-2xl">Use Mulch</h3>

            <p className="text-[#757575] text-base">
              Retain moisture and prevent weeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutdoorPlants;
