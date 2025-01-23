import SiteTitle from "../../../shared/SiteTitle";

const SpecificPlants = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-5 xl:pl-5">
      <SiteTitle title="Plant-Specific Tips" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-1 gap-6 mt-6 overflow-y-auto">
        <div className="w-full flex flex-col 2xl:flex-row justify-center items-center 2xl:justify-start gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476083/Astrofarer_bowl-shaped_pot_of_beautiful_cacti_and_succulents_ba0mnd.webp"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-xl md:text-2xl">Succulents & Cacti</h1>
          <p className="text-[#757575] text-base">
            Bright light, sparing water.
          </p>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center items-center 2xl:justify-start gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476079/pngtree-table-with-an-herb-garden-on-it-picture-image_2762219_vfwj6m.webp"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-xl md:text-2xl">Herbs</h1>
          <p className="text-[#757575] text-base">
            Sunny spot, regular trimming.
          </p>
        </div>

        <div className="w-full flex flex-col 2xl:flex-row justify-center items-center 2xl:justify-start gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://res.cloudinary.com/dcnktq9l2/image/upload/v1737476079/FINAL_CUT-dark-blue-orchid2_jy3rzi.webp"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-xl md:text-2xl">Orchids</h1>
          <p className="text-[#757575] text-base">
            Special potting mix, indirect light.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecificPlants;
