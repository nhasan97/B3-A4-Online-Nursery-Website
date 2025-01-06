import SiteTitle from "../../../shared/SiteTitle";

const SpecificPlants = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 py-5 xl:pl-5">
      <SiteTitle title="Plant-Specific Tips" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://i.ibb.co.com/44wWJKF/Astrofarer-bowl-shaped-pot-of-beautiful-cacti-and-succulents.webp"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-2xl">Succulents & Cacti</h1>
          <p className="text-[#757575] text-base">
            Bright light, sparing water.
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://i.ibb.co.com/NjgQ3HF/pngtree-table-with-an-herb-garden-on-it-picture-image-2762219.png"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-2xl">Herbs</h1>
          <p className="text-[#757575] text-base">
            Sunny spot, regular trimming.
          </p>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 bg-[#b0c3b148]  p-5 rounded-lg shadow-lg">
          <img
            src="https://i.ibb.co.com/qpwq0DF/FINAL-CUT-dark-blue-orchid2.jpg"
            alt=""
            className="h-[200px]"
          />
          <h1 className="text-2xl">Orchids</h1>
          <p className="text-[#757575] text-base">
            Special potting mix, indirect light.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpecificPlants;
