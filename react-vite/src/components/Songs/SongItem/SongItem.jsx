import { IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { setPlayIndexAction, loadPlaylistAction, setScliceIndexAction } from "../../../redux/playlist";
import { getAllSongs } from "../../../redux/song";
import "./SongItem.css"
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";



function SongItem({ song, index }) {
    const dispatch = useDispatch();
    // let idx = useSelector(state => state.playlist).index
    // const playlistState = useSelector(state => state.playlist);
    // const playIndex = playlistState?.playIndex;
    // const sliceIndex = playlistState?.sliceIndex;
    // const [songIdx, setSongIdx] = useState(playIndex || 0)
    // const [sliceIdx, setSliceIdx] = useState(sliceIndex || 0)
    // const playlist = playlistState?.Songs;
    // MusicPlayer()

    // const playlist = Object.values(useSelector(state => state.playlist).Songs)

    const handleClickPlaying = () => {
        dispatch(setScliceIndexAction(index))
        dispatch(setPlayIndexAction(0));
        // console.log("SomgItem playlist ", playlist, index);
        // dispatch(loadPlaylistAction(playlist.slice(index)));
        dispatch(getAllSongs())
            .then((res) => {
                console.log("SomgItem playlist ", res.songs.slice(index), index);
                // dispatch(loadPlaylistAction(res.songs))
                dispatch(loadPlaylistAction(res.songs.slice(index)))
            })
            .then(() => {
                // const audio = document.querySelector('button.rhap_play-pause-button')
                // audio.handleClickNext();

                const audio = document.getElementsByTagName('audio')[0];
                // audio.src = playlist[index].song_url;
                // const name = document.getElementsByClassName("song-name-player")[0];
                // name.innerText = playlist[index].song_name;
                audio.play();
                // console.log("index ====>", index, playlist[index].song_url)
            })
    }


    return (
        <>
            <span className="first-col" onClick={handleClickPlaying}>{index + 1}</span>
            <span className="second-col">
                <img src={song.album?.cover_img} />
                <span className="song-name-artist">
                    <span className="song-name">{song.song_name}</span>
                    <span>{song.artist.first_name} {song.artist.last_name}</span>
                </span>
            </span>
            <NavLink to={`/albums/${song.album?.id}`}>
                {song.album?.name}
            </NavLink>

            <span className="like-container">
                {song.likes}
                <span className="like-heart"><IoMdHeartEmpty size={20} /></span>
            </span>
            <span>{song.duration}</span>
        </>
    )
}

export default SongItem;
