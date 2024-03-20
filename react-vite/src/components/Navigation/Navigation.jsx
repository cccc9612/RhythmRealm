import { NavLink } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="nav-container">
      <div>
        <NavLink to="/"><GoHome /> Home</NavLink>
      </div>
      <div className="search-container">
        <IoSearchOutline />
        
          <button className="search-button-songs">
            <NavLink to="/search/songs">Songs</NavLink>
          </button>
          <button className="search-button-albums">
            <NavLink to="/search/albums">Albums</NavLink>
          </button>
        
      </div>

    </div>
  );
}

export default Navigation;
