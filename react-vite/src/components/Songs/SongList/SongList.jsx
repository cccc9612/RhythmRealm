import './SongList.css'
import { NavLink } from 'react-router-dom'
// import { IoMdHeartEmpty } from "react-icons/io";
import SongDropdown from "../../SongDropdown/SongDropdown"
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom'
// import { useContext } from 'react'


function SongList({ song, count }) {
    // const navigate = useNavigate()

    // const songState = useSelector(state => state.song);
    // const songs = Object.values(songState?.Songs)


    return (
        <>
            {/* <div onClick={() => { setSongList(values); setCurrentSong(count - 1); changePlay(true); changeCount(1) }}> */}
            {/*
            {console.log("song:", song)}
            {console.log("song name:", song?.song_name)}
            {console.log("artist:", song?.artist)}
            {console.log("artist first name:", song?.artist?.first_name)}
            {console.log("artist last name:", song?.artist?.last_name)} */}
            <span className="first-column">{count++}</span>
            <span className='second-col'>
                <img src={song.album?.cover_img ? `${song.album?.cover_img}` : "https://live.staticflickr.com/65535/53600353900_d12bfa5f73_k.jpg"} />
                <span className="song-name-artist">
                    <p className='song-name'>{song?.song_name}</p>

                </span>
                <NavLink to={`/albums/${song.album?.id}`}>
                    {song.album?.name}
                </NavLink>
                <span>{song.duration}</span>
                <SongDropdown song={song} />
            </span>
        </>
    )

}
export default SongList;
