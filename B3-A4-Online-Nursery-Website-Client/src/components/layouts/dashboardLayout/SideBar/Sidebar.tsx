// import MainLogo from "../shared/mainLogo";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import SideBarMenu from "./SideBarMenu";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-end items-center p-5 lg:hidden fixed z-20">
        <HiMenuAlt3
          className="text-2xl text-[#a5a5a5]"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>
      <div
        className={`w-64 h-full bg-[#F2F2F2] overflow-y-auto absolute lg:fixed z-20 lg:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full py-6">
          {/* <MainLogo caller={"d"}></MainLogo> */}
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <div className="avatar">
            <div className="w-16 sm:w-20 mask mask-hexagon">
              {/* <img src={} /> */}
            </div>
          </div>
          <h1 className="normal-case text-xl sm:text-2xl text-[#71357B] font-medium">
            jhjkh
          </h1>
          <p className="normal-case text-base sm:text-lg text-[#a5a5a5]">
            hkhk
          </p>
        </div>

        <div className="flex flex-col justify items-start text-[#a5a5a5] p-6">
          <SideBarMenu></SideBarMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
