import SiteTitle from "../shared/SiteTitle";

const OutdoorPlants = () => {
  return (
    <div className="w-full h-full flex flex-col xl:flex-row 2xl:flex-col">
      <div className="w-full xl:w-1/2 2xl:w-full h-full">
        <img
          src="https://i.ibb.co.com/59FKvTC/468326352-501045089619991-3440319891396866551-n.jpg"
          alt=""
          className="w-full h-full bg-[#B0C3B1] p-1 rounded-md object-fill object-center"
        />
      </div>

      <div className="w-full xl:w-1/2  2xl:w-full h-full flex flex-col justify-center items-center gap-6 py-5 xl:pl-5">
        <SiteTitle title="Outdoor Plant Care" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-6">
          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <img
              src="https://i.ibb.co.com/tDp0x7V/sprout.png"
              className="size-16"
            />
            <h3 className="text-2xl">Protect from Frost</h3>

            <p className="text-[#757575] text-base">
              Move plants indoors or cover them.
            </p>
          </div>

          <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
            <img
              src="https://i.ibb.co.com/JqTHLrd/mulch.png"
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
