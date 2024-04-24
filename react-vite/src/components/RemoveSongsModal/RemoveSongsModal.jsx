import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getSingleAlbum } from "../../redux/album";
import { removeAlbumSong } from "../../redux/album";
import "./RemoveSongsModal.css"


function RemoveSongsModal({albumId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const albumState = useSelector(state => state.album)
    const album = albumState.Albums[albumId]

    useEffect(() => {
        dispatch(getSingleAlbum(albumId))
      }, [dispatch, albumId])

    const handleRemove = (songId) => (e) => {
        e.preventDefault();
        dispatch(removeAlbumSong(albumId, songId))
        closeModal();
    }

    // function handleRemove(songId) {
    //     return function(e) {
    //         e.preventDefault();
    //         dispatch(removeAlbumSong(albumId, songId));
    //         closeModal();
    //     };
    // }

    return (
        <div className="album-detail-songs-container remove-songs-modal-container">
        <h3 className="search-song-h3">Songs</h3>
          <div className="song-list-row-title" id="remove-songs-modal-song-list-title">
            <span className="first-col">#</span>
            <span>Title</span>
            {/* <span>Album</span> */}
            {/* <span className="remove-songs-modal-likes-span">Likes</span> */}
            {/* <span className="remove-songs-modal-duration-span">Duration</span> */}
          </div>
        {album?.songs.map((song, index) => (
          <div className="song-list-row" id="remove-songs-modal-title-button-container" key={song.id}>
            <div id="remove-songs-modal-number-name-div">
              <span className="first-col">{index + 1}</span>
              <span className="second-col">
                  <span className="song-name-artist">
                      <span className="song-name">{song.song_name}</span>
                      <span>{song.artist.first_name} {song.artist.last_name}</span>
                  </span>
              </span>
            </div>
            {/* <span className="like-container remove-songs-modal-like-span">
                {song.likes}
            </span> */}
            {/* <span className="remove-songs-modal-duration-span">{song.duration}</span> */}
            <span className="remove-songs-modal-button-container"><button onClick={handleRemove(song.id)}>remove</button></span>

          </div>
        ))}
      </div>
    )
}

export default RemoveSongsModal;
