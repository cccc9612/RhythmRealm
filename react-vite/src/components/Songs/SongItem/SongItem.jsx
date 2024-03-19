import { IoMdHeartEmpty } from "react-icons/io";
import { NavLink } from "react-router-dom";
import "./SongItem.css"


function SongItem({ song, index }) {

    return (
        <>
            <span className="first-col">{index + 1}</span>
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
