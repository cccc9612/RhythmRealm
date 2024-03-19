import './SongList.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MusicContext } from '../../../context/MusicContext'
import { IndexContext } from '../../../context/IndexContext'

function SongList({ song }) {
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

            <div className="song-info-section">
                <p className="song-id">{count}</p>
                <div className="song-name-artist">
                    <p className='song-name'>{song?.song_name}</p>
                    <p>{song?.artist.first_name} {song?.artist.last_name}</p>
                </div>
            </div>
            {/* <p className="song-album-name" onClick={() => { (song?.artist.id) ? navigate(`/albums/${song?.artist.id}`) : navigate(`/songs/${song?.artist.id}`) }}>{albums[song?.artist.id] ? albums[song?.artist.id].name : song?.name}</p> */}
            {/* </div> */}
        </>
    )
}


export default SongList;
