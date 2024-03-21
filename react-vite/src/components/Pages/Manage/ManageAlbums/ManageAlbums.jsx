import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAlbums } from "../../../../redux/album";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useModal } from "../../../../context/Modal";
import AlbumItem from "../../../Albums/AlbumItem";
import DeleteAlbumModal from "../../../DeleteAlbumModal";
import RemoveSongsModal from "../../../RemoveSongsModal";

function ManageAlbums() {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const albumState = useSelector(state => state.album);
  console.log("albumState in component=======", albumState)
  const albums = Object.values(albumState?.Albums);
  console.log("albums in component", albums)

  useEffect(() => {
    dispatch(getCurrentAlbums())
  }, [dispatch]);

  const handleDeleteClick = (albumId) => {
      setModalContent(<DeleteAlbumModal albumId={albumId} />)
  }

  const handleRemoveClick = (albumId) => {
      setModalContent(<RemoveSongsModal albumId={albumId} />)
  }


  return (
    
    <div>
      <button><Link to={`/albums/new`}>Create Album</Link></button>
      <h2>Manage Albums</h2>
      <div className="albums-container">
      {albums?.map((album) => {
        return (
          <div key={album.id}>
          <NavLink to={`/albums/${album.id}`}>
            <AlbumItem album={album} />
          </NavLink>
          <div>
            <button><Link to={`/albums/${album.id}/edit`}>Update</Link></button>
            <button onClick={() => handleDeleteClick(album.id)}>Delete</button>
            <button onClick={() => handleRemoveClick(album.id)}>Remove songs from this album</button>
            <button><Link to={`/users/current/songs`}>Add songs to this album</Link></button>
          </div>

          </div>
        )
      })}
    </div>
    </div>
  ) 
}

export default ManageAlbums;
