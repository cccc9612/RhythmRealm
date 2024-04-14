import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAlbums } from "../../../../redux/album";
import { NavLink, useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { useModal } from "../../../../context/Modal";
import AlbumItem from "../../../Albums/AlbumItem";
// import DeleteAlbumModal from "../../../DeleteAlbumModal";
// import RemoveSongsModal from "../../../RemoveSongsModal";
import AlbumDropdown from "../../../AlbumDropdown/AlbumDropdown";
import './ManageAlbums.css'
// import manageAlbumImg from './ManageAlbums.png'

function ManageAlbums() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const { setModalContent } = useModal();
  const albumState = useSelector(state => state.album);
  // console.log("albumState in component=======", albumState)
  let albums = Object.values(albumState?.Albums);
  // console.log("albums in component", albums)
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(getCurrentAlbums())
  }, [dispatch]);

//   const handleDeleteClick = (albumId) => {
//     setModalContent(<DeleteAlbumModal albumId={albumId} />)
//   }

//   const handleRemoveClick = (albumId) => {
//     setModalContent(<RemoveSongsModal albumId={albumId} />)
//   }

  if (!sessionUser) return <h1>You must log in</h1>;
  if (albums) {
    albums = albums.filter(el => el.artist.id === sessionUser.id)
  }


  return (
    // <div className="album-list-container">
      //<div className="album-list-container">
        // <button><Link to={`/albums/new`}>Create Album</Link></button>
        <div className="manage-album-container">
          <div className="albums-header">
            <div className="albums-coverimg-title-container">
              <img className='manage-album-cover-img' src='/ManageAlbum.png' alt="manage-song-cover-img" />
              <h1 className="manage-song-title">Manage Albums</h1>
            </div>
            <div className="manage-album-upload-button">
              <button className="fa-solid fa-upload" onClick={() => navigate(`/albums/new`)}></button>
              <span>Create New</span>
            </div>
          </div>

          <div className="album-list-section image-section">
            {albums?.map((album) => {
              return (
                <div key={album.id}>
                  <NavLink to={`/albums/${album.id}`}>
                    <AlbumItem album={album} />
                  </NavLink>
                    <AlbumDropdown album={album} />
                  {/* <div className="manage-album-btn">
                    <button><Link to={`/albums/${album.id}/edit`}>Update</Link></button>
                    <button onClick={() => handleDeleteClick(album.id)}>Delete</button>
                    <button onClick={() => handleRemoveClick(album.id)}>Remove songs</button>
                    <button><Link to={`/users/current/songs`}>Add songs</Link></button>
                  </div> */}

                </div>
              )
            })}
          </div>
        </div>

      //</div>
    // </div>
  )
}

export default ManageAlbums;
