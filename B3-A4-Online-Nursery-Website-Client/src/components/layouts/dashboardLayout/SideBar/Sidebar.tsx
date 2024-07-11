import { useState } from "react";
// import MainLogo from "../shared/mainLogo";
import { HiMenuAlt3 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SideBarMenu from "./SideBarMenu";
import MainLogo from "@/components/shared/MainLogo";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-end items-center p-5 lg:hidden fixed z-20">
        <HiMenuAlt3
          className="text-2xl text-[#808080]"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>
      <div
        className={`w-64 h-full bg-[url(../public/sidebarBg.png)] bg-no-repeat bg-center bg-cover overflow-y-auto rounded-r-xl absolute lg:fixed z-20 lg:translate-x-0 ${
          openSidebar
            ? `translate-x-0 transition duration-300 ease-in-out`
            : `-translate-x-full transition duration-300 ease-in-out`
        }`}
      >
        <div className="w-full py-6">
          <MainLogo caller={"d"}></MainLogo>
        </div>

        <div className="w-full flex flex-col justify-center items-center gap-3 ">
          <div className="relative">
            <Avatar className="size-24">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback className="bg-[#98b2992f] text-4xl text-[#808080]">
                NH
              </AvatarFallback>
            </Avatar>
            <div className="size-6 bg-green-700 border-4 border-white rounded-full absolute right-0 bottom-2"></div>
          </div>
          <h1 className="normal-case text-xl sm:text-2xl text-[#5D7E5F] font-medium">
            Nazia Hasan
          </h1>
          <p className="normal-case text-base sm:text-lg text-[#808080]">
            nh@gmail.com
          </p>
        </div>

        <div className="flex flex-col justify items-start text-[#808080] p-6">
          <SideBarMenu></SideBarMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
