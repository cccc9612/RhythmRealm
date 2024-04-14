import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useNavigate } from "react-router-dom";

import "./ProfileButton.css"

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    document.body.click();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    navigate('/');
  };

  const manageSongs = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('/users/current/songs');
  };

  const manageAlbums = (e) => {
    e.preventDefault();
    closeMenu();
    navigate('/users/current/albums');
  };


  return (
    <>
      {user ?
        <button className="profile-btn" onClick={toggleMenu}>
          {/* <FaUserCircle size={30} color="rgb(255, 100, 55)" /> */}
          {user.first_name[0]}
        </button> : (
          <>
            <OpenModalButton
              buttonText="Sign Up"
              // onButtonClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalButton
              buttonText="Log In"
              // onButtonClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </>
        )
      }
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <p className='hello-user'>Hello, {user.username}</p>
              <p onClick={manageSongs}>Manage Songs</p>
              <p onClick={manageAlbums}>Manage Albums</p>
              <p onClick={logout}>Log out</p>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
