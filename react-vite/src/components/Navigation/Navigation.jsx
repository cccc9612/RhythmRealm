import { NavLink } from "react-router-dom";
// import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import "./Navigation.css";
// import logo from "./logo.png"

function Navigation() {
  return (
    <div className="nav-container">
      <div>
        <NavLink className="homepage-logo-sec" to="/">
          <img className="logo" src='/logo.png' alt='logo' />
          <span className="logo-title">RhythmRealm</span>
          <span className="logo-title2">RR</span>
        </NavLink>
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
