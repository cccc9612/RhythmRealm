import './SongList.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { MusicContext } from '../../../context/MusicContext'
import { IndexContext } from '../../../context/IndexContext'

export default function SongList({ songs, song, albums, artist, count, changePlay, changeCount }) {
    const navigate = useNavigate()
    const [songList, setSongList] = useContext(MusicContext)
    const [currentSong, setCurrentSong] = useContext(IndexContext)
    if (songList) currentSong
    // const minutes = Math.floor(song.duration / 60)
    // let seconds = song.duration % 60
    // if (seconds < 10) seconds = `0${seconds}`
    // let values = (Object.values(songs))


    console.log(songs, changePlay, changeCount);

    setSongList([]);
    setCurrentSong("")

    return (
        <>
            {/* <div onClick={() => { setSongList(values); setCurrentSong(count - 1); changePlay(true); changeCount(1) }}> */}
            <div className='playlist-song-tile'>
                <div className="song-info-div">
                    <p className="song-id">{count}</p>
                    <div className="song-name-artist">
                        <p className='song-name' onClick={() => navigate(`/songs/${song?.id}`)}>{song?.song_name}</p>
                        <p>{artist?.username}</p>
                    </div>
                </div>
                <p className="song-album-name" onClick={() => { (song.artist_id) ? navigate(`/albums/${song?.artist_id}`) : navigate(`/songs/${song.artist_id}`) }}>{albums[song.artist_id] ? albums[song.artist_id].name : song.name}</p>
                {/* <p>{`${minutes}:${seconds}`}</p> */}

            </div>
            {/* </div> */}
        </>
    )
}
