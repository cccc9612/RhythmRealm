import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { setPlayIndexAction, loadPlaylistAction } from "../../../redux/playlist";
import { getAllSongs } from "../../../redux/song";
import { likeSongThunk, dislikeSongThunk } from "../../../redux/song";
import "./SongItem.css"
import { useDispatch } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";



function SongItem({ song, index, user }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    // console.log(pathname)

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
        // dispatch(setScliceIndexAction(0))
        dispatch(setPlayIndexAction(index));
        // console.log("SomgItem playlist ", playlist, index);
        // dispatch(loadPlaylistAction(playlist.slice(index)));
        dispatch(getAllSongs())
            .then((res) => {
                // console.log("SomgItem playlist ", res.songs.slice(0), index);
                // dispatch(loadPlaylistAction(res.songs))
                dispatch(loadPlaylistAction(res.songs))
            })
            .then(() => {
                // const audio = document.querySelector('button.rhap_play-pause-button')
                // audio.handleClickNext();
                const rerender = document.getElementsByClassName("rerender-btn")[0];
                rerender.click();
                const audio = document.getElementsByTagName('audio')[0];
                // audio.src = playlist[index].song_url;
                // const name = document.getElementsByClassName("song-name-player")[0];
                // name.innerText = playlist[index].song_name;
                audio.play();
                // console.log("index ====>", index, playlist[index].song_url)
            })
    }


    const checkLikes = (song, user) => {
        return song.users_like.map(el => el.id).includes(user.id)
    }

    // const liketest = checkLikes(song, user);

    // console.log("0000000000000000000000", window.location.href)
    // console.log("1111111111111111111111", location)

    const toggleDislike = async () => {
        // const like = document.getElementById(e.currentTarget.id);
        await dispatch(dislikeSongThunk(song.id));
        const rerender = document.getElementsByClassName("rerender-btn")[0];
        if (rerender) rerender.click();
    }

    const toggleLike = async () => {
        // const like = document.getElementById(e.currentTarget.id);
        await dispatch(likeSongThunk(song.id));
        const rerender = document.getElementsByClassName("rerender-btn")[0];
        if (rerender) rerender.click();
    }

    return (
        <>
            <span className="first-col" onClick={handleClickPlaying}>{index + 1}</span>
            <span className="second-col">
                <img src={song.album?.cover_img? `${song.album?.cover_img}`: "https://live.staticflickr.com/65535/53600353900_d12bfa5f73_k.jpg"} />
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
                    {user &&
                    checkLikes(song, user)  ?
                    <span className="like-heart hold" id={"songitem-"+song.id} onClick={toggleDislike}><IoMdHeart size={20} /></span> :
                    <span className="like-heart" id={"songitem-"+song.id} onClick={toggleLike}><IoMdHeartEmpty size={20} /></span>}

            </span>
            <span>{song.duration}</span>
        </>
    )
}

export default SongItem;
