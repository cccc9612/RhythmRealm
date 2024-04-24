import './SongList.css'
import { NavLink } from 'react-router-dom'
// import { IoMdHeartEmpty } from "react-icons/io";
import SongDropdown from "../../SongDropdown/SongDropdown"
// import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'


function SongList({ song, count }) {
    // const navigate = useNavigate()

    // const songState = useSelector(state => state.song);
    // const songs = Object.values(songState?.Songs)


    return (
        <>
            <span className="first-column">{count++}</span>
            <span className='second-col'>
                <img src={song.album?.cover_img ? `${song.album?.cover_img}` : "https://live.staticflickr.com/65535/53600353900_d12bfa5f73_k.jpg"} />
                <span className="song-name-artist">
                    <p className='song-name'>{song?.song_name}</p>

                </span>
            </span>
            <NavLink to={`/albums/${song.album?.id}`} className="album-col">
                {song.album?.name}
            </NavLink>
            <span className="manage-songs-duration">
                <span className='song-duration'>{song.duration}</span>
                <SongDropdown id={song.id} song={song} />
            </span>
        </>
    )

}
export default SongList;
