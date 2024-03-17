import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { LuLibrary } from "react-icons/lu";
// import OpenModalMenuItem from "../components/Navigation/OpenModalMenuItem";
import Navigation from "../components/Navigation/Navigation";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <div className="page-container">
          <div className="sidebar-container">
            <Navigation />
            <div className="library-container">
              <div className="library-title">
                <LuLibrary /> Your library
              </div>
              <div className="playlist-list">
                playlsit
              </div>
            </div>
          </div>
          <div className="song-album-list-container">
            <div className="title-bar">
              <button className="signup-btn">Sign up</button>
              <button className="login-btn">Log in</button>
            </div>
            <div> {isLoaded && <Outlet />}</div>
          </div>
        </div>
        <Modal />
      </ModalProvider>
    </>
  );
}
