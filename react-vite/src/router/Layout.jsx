import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { LuLibrary } from "react-icons/lu";
import ProfileButton from "../components/Navigation/ProfileButton";
import MusicPlayer from "../components/MusicPlayer";
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
        <div className="page-player-container">
          <div className="page-container">
            <div className="sidebar-container">
              <Navigation />
              <div className="library-container">
                <div className="library-title">
                  <LuLibrary /> Your library
                </div>
                <div className="playlist-list">
                  playlistt
                </div>
              </div>
            </div>
            <div className="song-album-list-container">
              <div className="title-bar">
                <ProfileButton />
              </div>
              <div> {isLoaded && <Outlet />}</div>
              <div className="footer-container">
                <p>@ 2024 This site is for studying · <a href='https://github.com/cccc9612/RhythmRealm' target='_blank' rel="noreferrer">github repository</a></p>
              </div>
            </div>
          </div>
          <div className='page-bottom-container'>
            <MusicPlayer />
          </div>
        </div>
        <Modal />
      </ModalProvider>
    </>
  );
}
