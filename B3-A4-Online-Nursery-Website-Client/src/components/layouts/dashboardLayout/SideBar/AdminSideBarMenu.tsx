import "../../../cssStyles/Sidebar.css";
import SidebarMenuItem from "./SidebarMenuItem";
import { BiSolidCategory } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import { IoIosPeople } from "react-icons/io";
import { FaBlog, FaChartPie } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const AdminSideBarMenu = () => {
  return (
    <div className="sb flex flex-col justify-center items-start mx-auto">
      <SidebarMenuItem
        icon={<FaChartPie className="text-xl" />}
        menuText="Overview"
        route="/admin-dashboard/admin-overview"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<TbBrandBooking className="text-xl" />}
        menuText="Orders"
        route="/admin-dashboard/orders"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<i className="fa-solid fa-seedling"></i>}
        menuText="Products"
        route="/admin-dashboard/products"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<BiSolidCategory className="text-xl" />}
        menuText="Categories"
        route="/admin-dashboard/categories"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<FaBlog className="text-xl" />}
        menuText="Blogs"
        route="/admin-dashboard/blogs"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<IoIosPeople className="text-xl" />}
        menuText="Customers"
        route="/admin-dashboard/all-customers"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<MdEmail className="text-xl" />}
        menuText="Messages"
        route="/admin-dashboard/messages"
      ></SidebarMenuItem>

      <SidebarMenuItem
        icon={<i className="fa-solid fa-arrow-left"></i>}
        menuText="Back to Site"
        route="/"
      ></SidebarMenuItem>
    </div>
  );
};

export default AdminSideBarMenu;
