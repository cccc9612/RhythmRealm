import { useModal } from "../../context/Modal"
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { getSingleAlbum } from "../../redux/album";
import { removeAlbumSong } from "../../redux/album";


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
            </span>
            <span>{song.duration}</span>
            <span><button onClick={handleRemove(song.id)}>remove</button></span>
              {/* <SongItem song={song} index={index} /> */}

          </div>
        ))}
      </div>
    )
}

export default RemoveSongsModal;
