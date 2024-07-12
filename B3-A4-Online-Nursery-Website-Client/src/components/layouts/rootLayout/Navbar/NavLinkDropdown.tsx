import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { NavbarLinks } from "./NavbarLinks";
import { HiMenuAlt3 } from "react-icons/hi";

const NavLinkDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="bg-transparent">
          <HiMenuAlt3 className="text-2xl text-[#808080]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup>
          {NavbarLinks.map((link) => (
            <DropdownMenuRadioItem value="">
              <NavLink to={link.path}>{link.name}</NavLink>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavLinkDropdown;
