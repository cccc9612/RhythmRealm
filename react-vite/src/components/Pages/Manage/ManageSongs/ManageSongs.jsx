import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentSongs } from "../../../../redux/song";
import { getAllAlbums } from "../../../../redux/album"
import SongList from "../../../Songs/SongList/SongList";
import { useNavigate } from "react-router-dom";
// import { IndexContext } from "../../../../context/IndexContext";
import "./ManageSongs.css"




function ManageSongs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const user = useSelector(state => state.session.user)
  // if (!user) navigate('/')
  // const users = useSelector(state => state.user)
  // const albumState = useSelector(state => state.album);
  const songState = useSelector(state => state.song);
  const songs = Object.values(songState?.Songs)
  const [page, setPage] = useState(0);
  const sessionUser = useSelector(state => state.session.user);

  const limit = 12;
  let songsDisplay = songs.slice(page * limit, (page + 1) * limit)

  useEffect(() => {
    dispatch(getCurrentSongs())
    dispatch(getAllAlbums())
  }, [dispatch]);

  const handlePrevPage = () => {
    if (page - 1 >= 0) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (page + 1 < Math.ceil(songs.length / limit)) {
      setPage(page + 1)
    }
  }

  if (!sessionUser) navigate('/');


  return (
    <section className="manage-song-container">

      <div className="songs-header">
        <img className='manage-song-cover-img' src='/ManageSongs.png' alt="manage-song-cover-img" />
        <h1 className='manage-song-title'>Manage Songs</h1>

      </div>
      <div className="pagination" style={{ fontWeight: "bold" }}>
        <button className="prev-page-click"
          onClick={handlePrevPage}
          disabled={page == 0 ? true : false}>
          Prev
        </button>
        <span> </span>
        <button className="next-page-click"
          onClick={handleNextPage}
          disabled={page == Math.ceil(songs.length / limit) - 1 ? true : false}>
          Next
        </button>
      </div>
      <div className="manage-song-upload-button">

        <button className="fa-solid fa-upload" onClick={() => navigate(`/songs/new`)}></button>
        <span>Upload</span>
      </div>


      <div className="bottom-section">
        <div className="song-list-info-header">
          <p className="first-column">#</p>
          <p>Title</p>
          <p>Album</p>
          <p className="fifth-col"><HiOutlineClock /></p>
        </div>
        {songsDisplay?.map((song, count) => {
          return (
            <div className="song-list-row" key={songs.id}>
              <SongList key={songs.id}
                song={song}
                count={count + 1} />
            </div>
          )
        })}

      </div>
    </section >

  )
}

export default ManageSongs;
