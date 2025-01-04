/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SideBar/Sidebar";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import userApi from "@/redux/features/user/userApi";
import { TUser } from "@/types/auth.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { token } = useAppSelector((currentState) => currentState.auth);

  let decodedUserInfo: any;

  if (token) {
    decodedUserInfo = verifyToken(token);
  }

  const { isLoading: loadingUser, data: loadedUser } = userApi.useGetUserQuery(
    (decodedUserInfo as TUser).id
  );

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col">
      <div className="w-full h-16 bg-white flex justify-end items-center px-5 md:px-10 2xl:px-20 py-2 fixed z-20">
        <div className="hidden lg:flex justify-center items-center p-1 border rounded-full">
          <Avatar>
            <AvatarImage
              src={(decodedUserInfo as TUser)?.profilePhoto}
              alt="@shadcn"
            />
            <AvatarFallback>
              {(decodedUserInfo as TUser)?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-transparent hover:bg-transparent text-lg text-[#808080] hover:text-[#98B299]">
                <i className="fa-solid fa-angle-down" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="m-3">
              <DropdownMenuLabel>
                Signed In as <br />
                <span className="font-bold">
                  {(decodedUserInfo as TUser)?.email}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    (decodedUserInfo as TUser)?.role === "admin"
                      ? "/admin-dashboard/profile"
                      : "/user-dashboard/profile"
                  )
                }
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="p-2 bg-transparent hover:bg-[#98B299] text-[#98B299] hover:text-[rgba(255,255,255,0.88)] text-base rounded-full border border-[#98B299] hover:border-transparent"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <HiMenuAlt3
          className="text-2xl text-[#808080] flex lg:hidden"
          onClick={() => setOpenSidebar(!openSidebar)}
        />
      </div>

      <Sidebar
        openSidebar={openSidebar}
        loadingUser={loadingUser}
        loadedUser={loadedUser}
        decodedUserInfo={decodedUserInfo as TUser}
      ></Sidebar>
      <div className="flex-1 lg:ml-64 pt-16 relative">
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
