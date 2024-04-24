import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../redux/song";
import { getAllAlbums } from "../../../redux/album";
import { NavLink } from "react-router-dom";
import SongItem from "../../Songs/SongItem";
import AlbumItem from "../../Albums/AlbumItem";
import { HiOutlineClock } from "react-icons/hi2";
import "./Home.css"
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const songState = useSelector(state => state.song);
  const albumState = useSelector(state => state.album);
  const sessionUser = useSelector(state => state.session.user);
  const songs = Object.values(songState?.Songs)
  const albums = Object.values(albumState?.Albums)
  let limit = sessionUser ? 10 : 5;
  songs.sort((a, b) => {
    return (new Date(b.created_at)) - (new Date(a.created_at));
  })


  useEffect(() => {
    dispatch(getAllSongs())
    dispatch(getAllAlbums())
  }, [dispatch]);
  const audio = document.getElementsByTagName('audio')[0];
  if (audio) audio.autoplay = false;
  return (
    <>
      <div className="song-list-container">
        <div className="title-container">
          <h3>Recent songs</h3>
          <NavLink to={'/songs'}>Show all</NavLink>
        </div>
        <div className="song-list">
          <div className="song-list-row-title">
            <span className="first-col">#</span>
            <span className="second-col">Title</span>
            <span className="third-col">Album</span>
            <span className="like-container">Likes</span>
            <span className="fifth-col"><HiOutlineClock /></span>
          </div>
          {songs?.slice(0, limit).map((song, index) => {
            return (
              <div className="song-list-row" key={song?.id}>
                <SongItem song={song} index={index} user={sessionUser} songs={songs} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="album-list-container">
        <div className="title-container">
          <h3>Today&apos;s biggest hits</h3>
          <NavLink to={'/albums'}>Show all</NavLink>
        </div>
        <div className="albums-container">
          {albums?.slice(0, limit).map((album) => {
            return (
              <NavLink key={album?.id} to={`/albums/${album?.id}`}>
                <AlbumItem album={album} />
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )

}

export default Home;
