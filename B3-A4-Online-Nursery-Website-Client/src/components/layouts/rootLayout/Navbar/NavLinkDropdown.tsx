import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink, useNavigate } from "react-router-dom";
import { NavbarLinks } from "./NavbarLinks";
import { HiMenuAlt3 } from "react-icons/hi";
import { TUser } from "@/types/auth.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { logout } from "@/redux/features/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavLinkDropdown = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((currentState) => currentState.auth);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-transparent">
          <HiMenuAlt3 className="text-2xl text-[#808080]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="m-3">
        {(user as TUser)?.email && (
          <DropdownMenuLabel>
            Signed In as <br />
            <div className="flex items-center gap-2 my-2">
              <Avatar>
                <AvatarImage
                  src={(user as TUser)?.profilePhoto}
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {(user as TUser)?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="font-bold">{(user as TUser)?.email}</span>
            </div>
          </DropdownMenuLabel>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup>
          {NavbarLinks.map((link) => (
            <DropdownMenuRadioItem key={link.name} value="">
              <NavLink to={link.path}>{link.name}</NavLink>
            </DropdownMenuRadioItem>
          ))}

          <DropdownMenuRadioItem value="">
            <NavLink
              to="/cart-page"
              // className="p-2 rounded-full transition duration-300 ease-in-out"
            >
              Cart
            </NavLink>
          </DropdownMenuRadioItem>

          {(user as TUser)?.role === "admin" && (
            <DropdownMenuRadioItem value="">
              <NavLink to="/admin-dashboard">Dashboard</NavLink>
            </DropdownMenuRadioItem>
          )}

          {(user as TUser)?.role === "user" && (
            <DropdownMenuRadioItem value="">
              <NavLink to="/user-dashboard">Dashboard</NavLink>
            </DropdownMenuRadioItem>
          )}

          {(user as TUser)?.role === "admin" && (
            <DropdownMenuRadioItem value="">
              <NavLink to="/admin-dashboard/profile">Profile</NavLink>
            </DropdownMenuRadioItem>
          )}

          {(user as TUser)?.role === "user" && (
            <DropdownMenuRadioItem value="">
              <NavLink to="/user-dashboard/profile">Profile</NavLink>
            </DropdownMenuRadioItem>
          )}

          <DropdownMenuRadioItem value="">
            {(user as TUser)?.email ? (
              <Button
                className="p-2 bg-transparent hover:bg-[#98B299] text-[#98B299] hover:text-[rgba(255,255,255,0.88)] text-base rounded-full border border-[#98B299] hover:border-transparent"
                onClick={() => dispatch(logout())}
              >
                Logout
              </Button>
            ) : (
              <Button
                className="p-2 bg-transparent hover:bg-[#98B299] text-[#98B299] hover:text-[rgba(255,255,255,0.88)] text-base rounded-full border border-[#98B299] hover:border-transparent"
                onClick={() => navigate("/login")}
              >
                Login/Reg
              </Button>
            )}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavLinkDropdown;
