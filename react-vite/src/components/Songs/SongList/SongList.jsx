import './SongList.css'
import { NavLink } from 'react-router-dom'
import { IoMdHeartEmpty } from "react-icons/io";

import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MusicContext } from '../../../context/MusicContext'
import { IndexContext } from '../../../context/IndexContext'

function SongList({ song, count }) {
    // const navigate = useNavigate()
    // const [songList, setSongList] = useContext(MusicContext)
    // // const [currentSong, setCurrentSong] = useContext(IndexContext)
    // if (songList) currentSong

    // setSongList([]);
    // setCurrentSong("")


    return (
        <>
            {/* <div onClick={() => { setSongList(values); setCurrentSong(count - 1); changePlay(true); changeCount(1) }}> */}
            {/*
            {console.log("song:", song)}
            {console.log("song name:", song?.song_name)}
            {console.log("artist:", song?.artist)}
            {console.log("artist first name:", song?.artist?.first_name)}
            {console.log("artist last name:", song?.artist?.last_name)} */}

            <span className="song-info-section">
                <p className="song-id">{count}</p>
                <span className='second-col'>
                    <img src={song.album?.cover_img} />
                    <span className="song-name-artist">
                        <p className='song-name'>{song?.song_name}</p>
                        <p>{song?.artist.first_name} {song?.artist.last_name}</p>
                    </span>
                </span>
            </span>
            <NavLink to={`/albums/${song.album?.id}`}>
                {song.album?.name}
            </NavLink>

            <span>{song.duration}</span>
            {/* <p className="song-album-name" onClick={() => { (song?.artist.id) ? navigate(`/albums/${song?.artist.id}`) : navigate(`/songs/${song?.artist.id}`) }}>{albums[song?.artist.id] ? albums[song?.artist.id].name : song?.name}</p> */}
            {/* </div> */}
        </>
    )
}


export default SongList;
