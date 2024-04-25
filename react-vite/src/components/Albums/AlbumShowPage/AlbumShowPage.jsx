import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../../redux/album";
// import SongItem from "../../Songs/SongItem";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoMdHeart } from "react-icons/io";
// import { likeSongThunk, dislikeSongThunk } from "../../../redux/song";
import SongItemInAlbum from "../../Songs/SongitemInAlbum";
import './AlbumShowPage.css'
import { HiOutlineClock } from "react-icons/hi2";


function AlbumShowPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [num, setNum] = useState(0)
  const { albumId } = useParams();
  // console.log("albumId======", albumId)
  // const [like, setLike] = useState(false)

  const albumState = useSelector(state => state.album)
  // console.log("albumstate========", albumState)

  const album = albumState.Albums[albumId]
  // console.log("album in component", album)


  useEffect(() => {
    dispatch(getSingleAlbum(albumId))
  }, [dispatch, albumId, num])

  // const onChange = async(song) =>{
  //   console.log("song in onChange ==========", song)
  //   const songId = song.id
  //   setLike(!like)
  //   if (like == true) {
  //     const res = await fetch(`/api/songs/${songId}/like`, {
  //       method:'POST',
  //       headers: {'Content-Type': 'application/json'}
  //     });
  //     console.log("res from fetch======", res.json())
  //   }
  // }
  const clickRerender = () => {
    setNum(num + 1);
  }

  return (
    <>
      <div className="album-detail-cover-container">
        <img src={album?.cover_img} alt={album?.name} />
        <div>
          <h1>{album?.name}</h1>
          <h4>{album?.artist.first_name} {album?.artist.last_name} · {album?.songs.length > 1 ? `${album?.songs.length} songs` : `${album?.songs.length} song`}</h4>
          <span className="album-rerender-btn" onClick={clickRerender}>{num}</span>
        </div>
      </div>
      <div className="album-detail-songs-container">
        <h3 className="search-song-h3">Songs</h3>
        <div className="song-list-row-title">
          <span className="first-col">#</span>
          <span>Title</span>

          <span className="like-container">Likes</span>
          <span className="fifth-col"><HiOutlineClock /></span>
        </div>
        {album?.songs.map((song, index) => {
          return (
            <div className="song-list-row" key={song.id}>
              <SongItemInAlbum song={song} index={index} user={sessionUser} songs={album?.songs}/>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AlbumShowPage;
