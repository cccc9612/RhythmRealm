import './SongList.css'
import { NavLink } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";
import SongDropdown from "../../SongDropdown/SongDropdown"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'


function SongList({ song, count }) {
    // const navigate = useNavigate()
    // const [songList, setSongList] = useContext(MusicContext)
    // // const [currentSong, setCurrentSong] = useContext(IndexContext)
    // if (songList) currentSong

    // setSongList([]);
    // setCurrentSong("")
    const songState = useSelector(state => state.song);
    const sessionUser = useSelector(state => state.session.user);
    const songs = Object.values(songState?.Songs)


    return (
        <>
            {/* <div onClick={() => { setSongList(values); setCurrentSong(count - 1); changePlay(true); changeCount(1) }}> */}
            {/*
            {console.log("song:", song)}
            {console.log("song name:", song?.song_name)}
            {console.log("artist:", song?.artist)}
            {console.log("artist first name:", song?.artist?.first_name)}
            {console.log("artist last name:", song?.artist?.last_name)} */}


            <span className="first-column">{count}</span>
            <span className='second-col'>
                <img src={song.album?.cover_img} />
                <span className="song-name-artist">
                    <p className='song-name'>{song?.song_name}</p>
                    <p>{song?.artist.first_name} {song?.artist.last_name}</p>
                </span>
                <NavLink to={`/albums/${song.album?.id}`}>
                    {song.album?.name}
                </NavLink>
                <span>{song.duration}</span>
                {/* <p className="song-album-name" onClick={() => { (song?.artist.id) ? navigate(`/albums/${song?.artist.id}`) : navigate(`/songs/${song?.artist.id}`) }}>{albums[song?.artist.id] ? albums[song?.artist.id].name : song?.name}</p> */}
                {/* </div> */}
                <SongDropdown song={songs} />
            </span>

        </>
    )
}


export default SongList;
