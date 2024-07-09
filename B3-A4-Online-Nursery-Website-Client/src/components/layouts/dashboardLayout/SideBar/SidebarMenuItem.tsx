import { NavLink } from "react-router-dom";

const SidebarMenuItem = ({ icon, menuText, route }) => {
  return (
    <NavLink
      to={route}
      className="flex justify-center items-center gap-3 p-2 text-base sm:text-lg hover:text-[#5D7E5F] transition duration-150"
    >
      {icon}
      {menuText}
    </NavLink>
  );
};

export default SidebarMenuItem;
