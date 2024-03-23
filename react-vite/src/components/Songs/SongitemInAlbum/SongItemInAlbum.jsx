import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { setPlayIndexAction, loadPlaylistAction } from "../../../redux/playlist";
// import { getAllSongs } from "../../../redux/song";
import { likeSongThunk, dislikeSongThunk } from "../../../redux/song";
import { IoMdPlay } from "react-icons/io";

import { useDispatch } from "react-redux";
import "./SongItemInAlbum.css";

function SongItemInAlbum({ song, index, user, songs }) {
    const dispatch = useDispatch();

    const handleClickPlaying = () => {
        dispatch(setPlayIndexAction(index));
        dispatch(loadPlaylistAction(songs))

        const rerender = document.getElementsByClassName("rerender-btn")[0];
        rerender.click();
        const audio = document.getElementsByTagName('audio')[0];
        audio.play();

    }


    const checkLikes = (song, user) => {
        return song.users_like.map(el => el.id).includes(user.id)
    }

    const toggleDislike = async () => {
        await dispatch(dislikeSongThunk(song.id));

        const rerender1 = document.getElementsByClassName("rerender-btn")[0];
        if (rerender1) rerender1.click();
        const rerender2 = document.getElementsByClassName("album-rerender-btn")[0];
        if (rerender2) rerender2.click();
    }

    const toggleLike = async () => {
        await dispatch(likeSongThunk(song.id));
        const rerender1 = document.getElementsByClassName("rerender-btn")[0];
        if (rerender1) rerender1.click();
        const rerender2 = document.getElementsByClassName("album-rerender-btn")[0];
        if (rerender2) rerender2.click();
    }

    return (
        <>
            <span className="first-col" onClick={handleClickPlaying}>{index + 1}</span>
            <span className="second-col">
                <span className="song-name-artist">
                    <span className="song-name">{song.song_name}</span>
                    <span>{song.artist.first_name} {song.artist.last_name}</span>
                </span>
            </span>

            <span className="like-container">
                {song.likes}
                {user &&
                    checkLikes(song, user) ?
                    <span className="like-heart hold album-detail" id={"album-song-" + song.id} onClick={toggleDislike}><IoMdHeart size={20} /></span> :
                    <span className="like-heart" id={"album-song-" + song.id} onClick={toggleLike}><IoMdHeartEmpty size={20} /></span>}
            </span>
            <span className="duration-col">{song.duration} <span className="play-btn" onClick={handleClickPlaying}><IoMdPlay size={20}/></span></span>
        </>
    )
}

export default SongItemInAlbum;
