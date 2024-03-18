import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../redux/song";
import { getAllAlbums } from "../../../redux/album";
import { NavLink } from "react-router-dom";
import SongItem from "../../Songs/SongItem";
import AlbumItem from "../../Albums/AlbumItem";
import "./Home.css"
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const songState = useSelector(state => state.song);
  const albumState = useSelector(state => state.album);
  const songs2 = Object.values(songState?.Songs)
  const albums = Object.values(albumState?.Albums)

  useEffect(() => {
    dispatch(getAllSongs())
    dispatch(getAllAlbums())
  }, [dispatch]);

  return (
    <>
      <div className="song-list-container">
        <h3>Recent songs</h3>
        <div className="song-list">
          <div className="song-list-row-title">
            <span className="first-col">#</span>
            <span>Title</span>
            <span>Album</span>
            <span>Likes</span>
            <span>Duration</span>
          </div>
          {songs2?.map((song, index) => {
            return (
              <div className="song-list-row" key={song.id}>
                <SongItem song={song} index={index} />
              </div>
            )
          })}
        </div>
      </div>
      <div className="album-list-container">
        <h3>Today&apos;s biggest hits</h3>
        <div className="albums-container">
          {albums?.map((album) => {
            return (
              <NavLink key={album.id} to={`/albums/${album.id}`}>
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
