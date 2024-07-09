import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      navbar
      <NavLink to="/dashboard">Product and Category Management</NavLink>
    </div>
  );
};

export default Navbar;
