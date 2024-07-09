import "../../../cssStyles/Sidebar.css";
import SidebarMenuItem from "./SidebarMenuItem";
import { BiSolidCategory } from "react-icons/bi";

const SideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<i className="fa-solid fa-seedling"></i>}
        menuText="Products"
        route="/dashboard/products"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<BiSolidCategory />}
        menuText="Categories"
        route="/dashboard/categories"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SidebarMenuItem>
    </div>
  );
};

export default SideBarMenu;
