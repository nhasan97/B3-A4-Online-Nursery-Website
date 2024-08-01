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
import { NavHashLink } from "react-router-hash-link";

const NavLinkDropdown = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

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
          <DropdownMenuRadioItem value="">
            <NavHashLink
              smooth
              to="#category"
              scroll={(el) => scrollWithOffset(el)}
            >
              Categories
            </NavHashLink>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="">
            <NavHashLink
              smooth
              to="#productList"
              scroll={(el) => scrollWithOffset(el)}
            >
              Products List
            </NavHashLink>
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="">
            <NavHashLink
              smooth
              to="#gallery"
              scroll={(el) => scrollWithOffset(el)}
            >
              Gallery
            </NavHashLink>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavLinkDropdown;
