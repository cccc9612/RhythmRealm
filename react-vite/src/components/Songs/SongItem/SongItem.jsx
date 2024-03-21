import { IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router-dom";
// import { setPlayIndexAction, loadPlaylistAction } from "../../../redux/playlist";
import { setPlayIndexAction } from "../../../redux/playlist";

import "./SongItem.css"
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";


function SongItem({ song, index }) {
    const dispatch = useDispatch();
    let idx = useSelector(state => state.playlist).index
    const playlist = Object.values(useSelector(state => state.playlist).Songs)

    const handleClickPlaying = () => {
        dispatch(setPlayIndexAction(index));
        // const audio = document.querySelector('button.rhap_play-pause-button')
        // audio.handleClickNext();
        const audio = document.getElementsByTagName('audio')[0];
        // audio.src = playlist[index].song_url;
        audio.play();
        console.log("index ====>", index, idx, playlist[index].song_url)
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
