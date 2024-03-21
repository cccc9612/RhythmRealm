import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import './UpdateSong.css'
import { useDispatch, useSelector } from "react-redux"
import { updateSongThunk } from "../../redux/song"
import { getSingleSongThunk } from "../../redux/song"

export default function UpdateSong() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const id = useParams().songId
    const user = useSelector(state => state.session.user)
    const song = useSelector(state => state.songs?.[id])
    const { songId } = useParams();
    const [songName, setSongName] = useState(song?.song_name)
    const [song_cover, setSongCover] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)
    const [song_file, setSongFile] = useState(null)
    // const [displayFile, setDisplayFile] = useState(null)
    const [awsLoading, setAwsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [clicked, setClicked] = useState(false)

    if (!user) navigate('/')

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
            setDisplayImage(song?.song_cover_url || '')
            setSongFile(song?.song_file_url || '')
        }
    }, [song])


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!Object.values(errors).length) {
            const artistId = user.id
            const formData = new FormData();
            formData.append("song_name", songName)
            formData.append("artist_id", artistId)
            formData.append("song_cover_url", song_cover);
            formData.append("song_file_url", song_file);
            formData.append('duration', 260)
            // aws uploads can be a bit slow—displaying
            // some sort of loading message is a good idea
            setAwsLoading(true);
            await dispatch(updateSongThunk(formData, song.id));
            navigate(`/songs/${song.id}`)
        }
    }

    return (
        <div className="song-main">
            <div className="create-song-box">
                <h1 style={{ paddingBottom: 20 }}>Update &quot;{song?.song_name}&quot;</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-body"
                >
                    <div className="entry-container">
                        <p>Song Name</p>
                        <input
                            type="text"
                            value={songName}
                            onChange={(e) => setSongName(e.target.value)}
                            className="song-inputs"
                        />
                        <div style={{ minHeight: 30 }}>{errors.songName ? <span className="error-message">{errors.songName}</span> : ' '}</div>
                    </div>
                    <div className="entry-container">
                        <p style={{ paddingTop: 8 }}>Update Song File</p>
                        <p style={{ fontSize: 13, paddingBottom: 10, paddingTop: 5 }}>To update the song file, click the file below.</p>
                        {!clicked ? (
                            <>
                                <div className='song-file-input' onClick={() => setClicked(!clicked)}>
                                    <p>{`${song?.song_name}.mp3`}</p>
                                </div>
                                <div style={{ minHeight: 20 }}></div>
                            </>
                        ) : (
                            <>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="song-inputs"
                                    onChange={(e) => setSongFile(e.target.files[0])}
                                />
                                <div style={{ minHeight: 20 }}></div>
                            </>
                        )}
                    </div>
                    <div className="update-button">
                        <button type="submit" id="submit_butt">Update Song</button>
                    </div>
                    <div style={{ minHeight: 30 }}>{awsLoading ? <p className="loading-text">Loading...</p> : ' '}</div>
                </form>
            </div>
        </div>
    )
}
