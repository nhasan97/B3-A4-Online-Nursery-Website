import MainLogo from "@/components/shared/MainLogo";
import { NavLink } from "react-router-dom";
import Container from "../Container";
import NavLinkDropdown from "./NavLinkDropdown";
import { NavbarLinks } from "./NavbarLinks";
import "../../../cssStyles/Navbar.css";
import { NavHashLink } from "react-router-hash-link";

const Navbar = () => {
  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80;
    window.scrollTo({ top: yCoordinate + yOffset, behavior: "smooth" });
  };

  return (
    <div className="w-full py-5">
      <Container>
        <div className="flex justify-between items-center">
          <div className="">
            <MainLogo caller={"n"}></MainLogo>
          </div>
          <div className="nv hidden lg:flex justify-center items-center gap-2 text-[#808080]">
            {NavbarLinks.map((link) => (
              <NavLink
                to={link.path}
                className="p-2 rounded-full hover:bg-[#98b2992f]  transition duration-300 ease-in-out"
              >
                {link.name}
              </NavLink>
            ))}

            <NavHashLink
              smooth
              className="p-2 rounded-full hover:bg-[#98b2992f]  transition duration-300 ease-in-out"
              to="#category"
              scroll={(el) => scrollWithOffset(el)}
            >
              Categories
            </NavHashLink>
            <NavHashLink
              smooth
              className="p-2 rounded-full hover:bg-[#98b2992f]  transition duration-300 ease-in-out"
              to="#productList"
              scroll={(el) => scrollWithOffset(el)}
            >
              Products List
            </NavHashLink>
            <NavHashLink
              smooth
              className="p-2 rounded-full hover:bg-[#98b2992f]  transition duration-300 ease-in-out"
              to="#gallery"
              scroll={(el) => scrollWithOffset(el)}
            >
              Gallery
            </NavHashLink>
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
