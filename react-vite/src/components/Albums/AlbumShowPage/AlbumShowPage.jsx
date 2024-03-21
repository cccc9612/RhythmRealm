import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleAlbum } from "../../../redux/album";
// import SongItem from "../../Songs/SongItem";
import { IoMdHeartEmpty } from "react-icons/io";
import './AlbumShowPage.css'


function AlbumShowPage() {
  const dispatch = useDispatch();
  const { albumId } = useParams();
  console.log("albumId======", albumId)
  // const [like, setLike] = useState(false)
  
  const albumState = useSelector(state => state.album)
  console.log("albumstate========", albumState)
  
  const album = albumState.Albums[albumId]
  console.log("album in component", album)
  

  useEffect(() => {
    dispatch(getSingleAlbum(albumId))
  }, [dispatch, albumId])

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

  return (
    <>
      <div className="album-detail-cover-container">
        <img src={album?.cover_img} alt={album?.name} />
        <div>
          <h1>{album?.name}</h1>
          <h4>{album?.artist.first_name} {album?.artist.last_name} · {album?.songs.length >1 ? `${album?.songs.length} songs`: `${album?.songs.length} song`}</h4>
        </div>
      </div>
      <div className="album-detail-songs-container">
        <h3 className="search-song-h3">Songs</h3>
          <div className="song-list-row-title">
            <span className="first-col">#</span>
            <span>Title</span>
            {/* <span>Album</span> */}
            <span>Likes</span>
            <span>Duration</span>
          </div>
        {album?.songs.map((song, index) => (
          <div className="song-list-row" key={song.id}>
            <span className="first-col">{index + 1}</span>
            <span className="second-col">
                {/* <img src={song.album?.cover_img} /> */}
                <span className="song-name-artist">
                    <span className="song-name">{song.song_name}</span>
                    <span>{song.artist.first_name} {song.artist.last_name}</span>
                </span>
            </span>
            <span className="like-container">
                {song.likes}
                {/* <span className="like-heart"> */}
                <span>
                  <IoMdHeartEmpty
                    // onClick={() => onChange(song)} 
                    // className={like == true? "filled" : "empty"}
                    size={20} 
                  />
                </span>
            </span>
            <span>{song.duration}</span>
              {/* <SongItem song={song} index={index} /> */}
          </div>
        ))}
      </div>
    </>
  )
}

export default AlbumShowPage;
