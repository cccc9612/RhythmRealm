import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAlbums } from "../../../../redux/album";
import { NavLink, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useModal } from "../../../../context/Modal";
import AlbumItem from "../../../Albums/AlbumItem";
import DeleteAlbumModal from "../../../DeleteAlbumModal";
import RemoveSongsModal from "../../../RemoveSongsModal";
// import './ManageAlbums.css'
// import manageAlbumImg from './ManageAlbums.png'

function ManageAlbums() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setModalContent } = useModal();
  const albumState = useSelector(state => state.album);
  console.log("albumState in component=======", albumState)
  const albums = Object.values(albumState?.Albums);
  console.log("albums in component", albums)
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    if (!sessionUser) navigate('/');
    dispatch(getCurrentAlbums())
  }, [dispatch, sessionUser, navigate]);

  const handleDeleteClick = (albumId) => {
    setModalContent(<DeleteAlbumModal albumId={albumId} />)
  }

  const handleRemoveClick = (albumId) => {
    setModalContent(<RemoveSongsModal albumId={albumId} />)
  }


  return (

    <div className="manage-album-container">
      <button><Link to={`/albums/new`}>Create Album</Link></button>
      <div className="albums-container">
        <div className="songs-header">
          {/* <img className='manage-song-cover-img' src={manageAlbumImg} alt="manage-song-cover-img" /> */}
          <h1 className="manage-song-title">Manage Albums</h1>
        </div>

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
