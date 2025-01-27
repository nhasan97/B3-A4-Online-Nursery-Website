/* eslint-disable @typescript-eslint/no-explicit-any */
import MainLogo from "@/components/shared/MainLogo";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../Container";
import NavLinkDropdown from "./NavLinkDropdown";
import { NavbarLinks } from "./NavbarLinks";
import "../../../cssStyles/Navbar.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { TUser } from "@/types/auth.type";
import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useCartContext from "@/hooks/useCartContext";
import { TCartContext } from "@/types/cart.type";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user: any;
  if (token) {
    user = verifyToken(token);
  }

  const navigate = useNavigate();

  const { itemsInCartCount } = useCartContext() as TCartContext;

  return (
    <div className="w-full py-5">
      <Container>
        <div className="flex justify-between items-center">
          <div className="w-fit">
            <MainLogo caller={"n"}></MainLogo>
          </div>

          <div className="nv hidden lg:flex justify-center items-center gap-2 text-[#808080]">
            {NavbarLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="p-2 rounded-full hover:bg-[#98B299] transition duration-300 ease-in-out"
              >
                {link.name}
              </NavLink>
            ))}

            {(user as TUser)?.role === "admin" && (
              <NavLink
                to="/admin-dashboard"
                className="p-2 rounded-full hover:bg-[#98B299] transition duration-300 ease-in-out"
              >
                Dashboard
              </NavLink>
            )}
            {(user as TUser)?.role === "user" && (
              <NavLink
                to="/user-dashboard"
                className="p-2 rounded-full hover:bg-[#98B299] transition duration-300 ease-in-out"
              >
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="hidden lg:flex justify-between items-center gap-2">
            <Button
              className="bg-transparent hover:bg-transparent text-lg text-[#808080] hover:text-[#98B299] relative"
              onClick={() => navigate("/cart-page")}
            >
              <i className="fa-solid fa-cart-shopping" />
              <p className="size-5 bg-[#808080] text-white text-xs border-2 border-white rounded-full absolute top-0 right-0">
                {itemsInCartCount}
              </p>
            </Button>

            {(user as TUser)?.email ? (
              <div className="flex justify-center items-center p-1 border rounded-full">
                <Avatar>
                  <AvatarImage
                    src={(user as TUser)?.profilePhoto}
                    alt="@shadcn"
                  />
                  <AvatarFallback>
                    {(user as TUser)?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="bg-transparent hover:bg-transparent text-lg text-[#808080] hover:text-[#98B299]">
                      <i className="fa-solid fa-angle-down" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>
                      Signed In as <br />
                      <span className="font-bold">
                        {(user as TUser)?.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        navigate(
                          (user as TUser)?.role === "admin"
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
            ) : (
              <Button
                className="p-2 bg-transparent hover:bg-[#98B299] text-[#98B299] hover:text-[rgba(255,255,255,0.88)] text-base rounded-full border border-[#98B299] hover:border-transparent"
                onClick={() => navigate("/login")}
              >
                Login/Reg
              </Button>
            )}
          </div>

          <div className="flex lg:hidden">
            <NavLinkDropdown></NavLinkDropdown>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
