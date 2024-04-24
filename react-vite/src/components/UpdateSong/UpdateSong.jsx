import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import './UpdateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { updateSongThunk } from "../../redux/song"
import { getSingleSongThunk } from "../../redux/song"
// import { updateSongThunk } from "../../redux/song";

export default function UpdateSong() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    // const song = useSelector(state => state.songs?.[id])
    // const albumState = useSelector(state => state.album)
    // console.log(albumState)
    const { songId } = useParams();
    const songState = useSelector(state => state.song)
    const song = songState.Songs[songId];

    const [song_file, setSongFile] = useState(null);
    const [songName, setSongName] = useState(song?.song_name)
    // const [displayFile, setDisplayFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [clicked, setClicked] = useState(false)



    useEffect(() => {
        const newErrors = {};
        if (!String(songName).length) {
            newErrors.songName = 'Name is required.'
        }
        setErrors(newErrors);
    }, [songName])

    useEffect(() => {
        dispatch(getSingleSongThunk(songId))
    }, [dispatch, songId])

    useEffect(() => {
        if (song) {
            setSongName(song?.song_name || '')
            setSongFile(song?.song_file_url || '')
        }
    }, [song])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Object.values(errors).length) {
            // const artistId = user.id
            const formData = new FormData();
            formData.append("songs_name", songName)
            formData.append("song_url", song_file);
            setLoading(true);
            dispatch(updateSongThunk(formData, song.id));
            navigate(`/users/current/songs`)
        }
    }

    if (!user) return <h1>You must log in</h1>;

    return (
        <div className="update-form update-song-form">
            <div className="create-container update-song-container">
                <h1 style={{ paddingBottom: 20 }}>Update &quot;{song?.song_name}&quot;</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-data update-song-form-data"
                >
                    <div className="entry-container">
                        <p style={{ paddingBottom: 8 }}>Song Name</p>
                        <input
                            type="text"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="input-box"
                        />
                        <div >{errors.songName ? <span className="error-message">{errors.songName}</span> : ' '}</div>
                    </div>
                    <div className="entry-container">
                        <p style={{ paddingTop: 8, paddingBottom: 25, }}>Click the song name below to update the file</p>
                        {!clicked ? (
                            <>
                                <div className="file-input-box" onClick={() => setClicked(!clicked)}>
                                    <p>{` File: ${song?.song_name}.mp3`}</p>
                                </div>
                                <div style={{ minHeight: 20 }}></div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="input-box"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />
                                <div style={{ minHeight: 20 }}></div>
                            </>
                        )}
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_button">Update Song</button>
                    </div>
                    <div style={{ minHeight: 30 }}>{loading ? <p className="loading-text">Loading...</p> : ' '}</div>
                </form>
            </div>
        </div>
    )
}
