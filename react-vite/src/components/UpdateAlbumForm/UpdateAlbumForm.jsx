import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleAlbum } from "../../redux/album";

function UpdateAlbumForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { albumId } = useParams();
    const albumState = useSelector(state => state.album)
    console.log("albumState in component===========", albumState)
    const album = albumState.Albums[albumId]
    console.log("album in component========", album)

    const [name, setName] = useState(album?.name)
    const [image, setImage] = useState(null)
    const [previewUrl] = useState(album?.cover_img)


    useEffect(() => {
        dispatch(getSingleAlbum(albumId))
    }, [dispatch, albumId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append("cover_img", image)
        }
        formData.append("name", name)

        const res = await fetch(`/api/users/current/albums/${albumId}/update`, {
            method: "PUT",
            body: formData
        })
        const data = await res.json()
        console.log("data from fetch============", data)
        navigate(`/albums/${albumId}`)
    }

    return (
        <div className="main-form">
            <div className="create-container">
                <h1>Update an Album</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-data"
                >
                    {previewUrl && <img src={previewUrl} alt="Cover preview" style={{ width: '100px', height: '100px' }} />}
                    <label>
                        Album Title
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="name-input"
                        />
                    </label>
                    <label>
                        Change Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="name-input"
                        />
                    </label>

                    <button type="submit" id="submit_button">Submit</button>
                    {/* {(imageLoading) && <p>Loading...</p>} */}
                </form>
            </div>
        </div>
    )

}

export default UpdateAlbumForm;
