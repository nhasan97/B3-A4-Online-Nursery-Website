import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col lg:flex-row">
      <Sidebar></Sidebar>
      <div className="flex-1 lg:ml-64 relative">
        <i
          className="fa-solid fa-arrow-left text-xl text-[#a5a5a5] hover:text-[#5D7E5F] absolute top-[55px] left-5 sm:top-10 sm:left-10"
          onClick={handleGoBack}
        ></i>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
