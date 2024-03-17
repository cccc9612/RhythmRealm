import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <div>
        <NavLink to="/"><GoHome /> Home</NavLink>
      </div>
      <div>
        <IoSearchOutline />
      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
