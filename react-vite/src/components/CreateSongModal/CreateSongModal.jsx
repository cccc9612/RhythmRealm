import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./CreateSong.css"


function CreateSongModal() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [song, setSong] = useState(null);
    const [songLoading, setSongLoading] = useState(false);
    const [errors, setErrors] = useState({})
    // const [duration, setDuration] = useState("");

    useEffect(() => {
        const validationObj = {};

        if (name.length < 1) {
            validationObj.name = "Song title is required"
        }

        if (!song) {
            validationObj.song = "Song file is required"
        }

        setErrors(validationObj)
    }, [name, song])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append("song_url", song);
            formData.append("songs_name", name);
            // formData.append("duration", duration)

            const res = await fetch("/api/users/current/songs", {
                method: "POST",
                body: formData
            });

            setSongLoading(true);
            const data = await res.json()
            console.log(data)
            navigate("/")
        }
    }

    return (
        <div className="main-form">
            <div className="create-container">
                <h1 >Upload a Song</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-data"
                >
                    <label>
                        Song Title
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-box"
                        />
                        <div>{errors.name && <p className="create-album-validator">{errors.name}</p>}</div>
                    </label>

                    <label>
                        Song File
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setSong(e.target.files[0])}
                            className="input-box"
                        />
                        <div>{errors.song && <p className="create-album-validator">{errors.song}</p>}</div>
                    </label>

                    {/* <lable>
                    Duration
                    <input 
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                    />
                </lable> */}

                    <button type="submit" id="submit_button">Submit</button>
                    {(songLoading) && <p>Loading...</p>}
                </form>
            </div>
        </div>
    )
}

export default CreateSongModal;
