import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import "./Navigation.css";
import logo from "./logo.png"

function Navigation() {
  return (
    <div className="nav-container">
      <div>
        <NavLink classname="homepage-logo-sec" to="/">
          <img className="logo" src={logo} alt='logo' />
          <h2>RhythmRealm</h2>
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
