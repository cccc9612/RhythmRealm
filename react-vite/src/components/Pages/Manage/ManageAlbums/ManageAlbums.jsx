import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentAlbums } from "../../../../redux/album";
import { NavLink, useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { useModal } from "../../../../context/Modal";
import AlbumItem from "../../../Albums/AlbumItem";
// import DeleteAlbumModal from "../../../DeleteAlbumModal";
// import RemoveSongsModal from "../../../RemoveSongsModal";
import './ManageAlbums.css'
// import manageAlbumImg from './ManageAlbum.png'
import AlbumDropdown from "../../../AlbumDropdown/AlbumDropdown"

function ManageAlbums() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { setModalContent } = useModal();
  const albumState = useSelector(state => state.album);
  // console.log("albumState in component=======", albumState)
  const albums = Object.values(albumState?.Albums);
  // console.log("albums in component", albums)
  const sessionUser = useSelector(state => state.session.user);


  useEffect(() => {
    dispatch(getCurrentAlbums())
  }, [dispatch]);

  // const handleDeleteClick = (albumId) => {
  //   setModalContent(<DeleteAlbumModal albumId={albumId} />)
  // }

  // const handleRemoveClick = (albumId) => {
  //   setModalContent(<RemoveSongsModal albumId={albumId} />)
  // }

  if (!sessionUser) navigate('/');


  return (
    // <div className="album-list-container">
    //<div className="album-list-container">
    // <button><Link to={`/albums/new`}>Create Album</Link></button>
    <div className="manage-album-container">
      <div className="albums-header">
        <img className='manage-album-cover-img' src='/ManageAlbum.png' alt="manage-song-cover-img" />
        <h1 className="manage-song-title">Manage Albums</h1>
        <div className="manage-album-upload-button">
          <button className="fa-solid fa-upload" onClick={() => navigate(`/albums/new`)}></button>
          <span>Create New</span>
        </div>
      </div>

      <div className="album-list-container2">
        <div className="manage-album-container">
          <div className="songs-header">
            <img className='manage-album-cover-img' src='/ManageAlbum.png' alt="manage-song-cover-img" />
            <h1 className="manage-song-title">Manage Albums</h1>
          </div>
          <div className="manage-album-upload-button">
            <button className="fa-solid fa-upload" onClick={() => navigate(`/albums/new`)}></button>
            <span>Create New</span>
          </div>
          <div className="image-section">
            <div className="album-list-section">
              {albums?.map((album) => {
                return (
                  <div key={album.id}>
                    <NavLink to={`/albums/${album.id}`}>
                      <AlbumItem album={album} />
                    </NavLink>
                    <AlbumDropdown album={album} />
                    {/* <span>hello</span> */}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageAlbums;
