import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAlbums } from "../../../redux/album";
import { NavLink } from "react-router-dom";
import AlbumItem from "../AlbumItem";

function AlbumList() {
  const dispatch = useDispatch();
  const albumState = useSelector(state => state.album);
  const albums = Object.values(albumState?.Albums);

  useEffect(() => {
    dispatch(getAllAlbums())
  }, [dispatch]);

  return (
    <div className="album-list-container">
      <div className="title-container">
        <h3>All albums</h3>
      </div>
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
  )
}


export default AlbumList;
