import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleSongThunk } from "../../redux/song"
import { updateSongThunk } from "../../redux/song";

function UpdateSong() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { songId } = useParams();
    const songState = useSelector(state => state.song)
    const song = albumState.Songs[songId]
    const [name, setName] = useState(album?.name)
    const [song_file, setSongFile] = useState(null)
    const [songName, setSongName] = useState(song?.song_name)


    useEffect(() => {
        dispatch(getSingleSongThunk(songId))
    }, [dispatch, songId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("cover_img", image)
        }
        formData.append("name", name)

        const res = await fetch(`/api/users/current/songs/${songId}/edit`, {
            method: "PUT",
            body: formData
        })
        const data = await res.json()
        navigate(`/songs/${songId}`)
    }

    return (
        <div className="main-form">
            <div className="create-container">
                <h1>Update &quot;{song?.song_name}&quot;</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-data"
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
                        <p>Update Cover Photo</p>
                        <p style={{ fontSize: 13, paddingBottom: 10, paddingTop: 5 }}>Update the cover photo</p>
                        <label className="image-input-label" htmlFor="update-image-input"><img className="thumbnail" src={displayImage} /><input
                            className="song-inputs"
                            id='update-image-input'
                            type="file"
                            accept="image/*"
                            onChange={fileWrap}
                        /></label>
                        <div style={{ minHeight: 20, paddingTop: 10 }}></div>
                    </div>
                    <div className="entry-container">
                        <p style={{ paddingTop: 8 }}>Update Song File</p>
                        <p style={{ fontSize: 13, paddingBottom: 10, paddingTop: 5 }}>Update the song file</p>
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

export default UpdateSong;
