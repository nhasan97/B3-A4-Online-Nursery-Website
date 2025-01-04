import { FaChartPie } from "react-icons/fa";
import SidebarMenuItem from "./SidebarMenuItem";
import { TbBrandBooking } from "react-icons/tb";

const UserSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<FaChartPie className="text-xl" />}
        menuText="Overview"
        route="/user-dashboard/user-overview"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<TbBrandBooking className="text-xl" />}
        menuText="Orders"
        route="/user-dashboard/orders"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<i className="fa-solid fa-heart" />}
        menuText="Wishlist"
        route="/user-dashboard/whishlist-page"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SidebarMenuItem>
    </div>
  );
};

export default UserSideBarMenu;
