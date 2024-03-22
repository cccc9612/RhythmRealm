import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import { LuLibrary } from "react-icons/lu";
import { useLocation } from "react-router-dom";
// import { loadPlaylistAction, setPlayIndexAction } from "../redux/playlist";
// import { getAllSongs } from '../redux/song';
import ProfileButton from "../components/Navigation/ProfileButton";
import OpenModalButton from "../components/OpenModalButton/OpenModalButton";
import SignupFormModal from "../components/SignupFormModal";
import MusicPlayer from "../components/MusicPlayer";
// import OpenModalMenuItem from "../components/Navigation/OpenModalMenuItem";
import Navigation from "../components/Navigation/Navigation";
import { NavLink } from "react-router-dom";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const { pathname } = location;
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  // const playlistState = useSelector(state => state.playlist);
  // const playlist = Object.values(playlistState?.Songs)
  // const playIndex = playlistState?.index;
  // const [songIndex, setSongIndex] = useState(playIndex || 0)
  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);


  const checkPath = (pathname) => {
    if (pathname === "/" || pathname === "/songs" ||
      (pathname.length > 8 && pathname.startsWith("/albums/") && !pathname.endsWith("/edit"))) {
      return true;
    } else {
      return false;
    }

  }

  const createPlaylist = (e) => {
    e.preventDefault();
    alert("Feature Coming Soon");
  }

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
                  <span>Create your first playlist</span>
                  <span>It&apos;s easy, we`&apos;ll help you</span>
                  <button className="playlist-btn" onClick={createPlaylist}>Create your playlist</button>
                  <button onClick={createPlaylist}>Browse playlists</button>
                </div>
                <NavLink className="link-to-allsongs" to={`/songs`}>All Songs</NavLink>
                <NavLink className="link-to-allalbums" to={`/albums`}>All Albums</NavLink>
                {sessionUser &&
                  <>
                    <NavLink className="link-to-managesongs" to={`/users/current/songs`}>Manage Songs</NavLink>
                    <NavLink className="link-to-managealbums" to={`/users/current/albums`}>Manage Albums</NavLink>
                  </>
                }
              </div>
            </div>
            <div className="song-album-list-container">
              <div className="nav-title-bar">
                <div className="nav-buttons">
                  <button onClick={() => navigate(-1)} type="button" className="fa fas fa-chevron-left"></button>
                  <button onClick={() => navigate(1)} type="button" className="fa fas fa-chevron-right"></button>
                </div>
                <div className="profile-btn-container"> <ProfileButton /></div>

              </div>
              <div> {isLoaded && <Outlet />}</div>
              <div className="footer-container">
                <p>@ 2024 This site is for studying · <a href='https://github.com/cccc9612/RhythmRealm' target='_blank' rel="noreferrer">github repository</a></p>
              </div>
            </div>
          </div>
          <div className='page-bottom-container'>
            {!sessionUser ?
              (
                <div className="page-bottom-signup">
                  <div>
                    <div>Preview of RR</div>
                    <div>Sign up to listen to all songs.</div>
                  </div>
                  <OpenModalButton
                    buttonText="Sign Up"
                    // onButtonClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              )
              : (
                checkPath(pathname) ?
                  <MusicPlayer /> :
                  <div className="page-bottom-signup">
                    <div>
                      <div>Preview of RR</div>
                      <div>More features coming soon.</div>
                    </div>
                  </div>
              )
            }
          </div>
        </div>
        <Modal />
      </ModalProvider>
    </>
  );
}
