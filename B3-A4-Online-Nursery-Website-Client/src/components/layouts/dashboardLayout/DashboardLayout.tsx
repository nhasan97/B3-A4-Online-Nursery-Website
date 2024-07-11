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
          className="fa-solid fa-arrow-left text-xl text-[#808080] hover:text-[#5D7E5F] absolute top-5 left-5 sm:top-5 md:left-10"
          onClick={handleGoBack}
        ></i>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
