import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import './CreateAlbumModal.css'

function CreateAlbumModal() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
    const [errors, setErrors] = useState({});
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) navigate('/');

    useEffect(() => {
        const validationObj = {};

        if (name.length < 1) {
            validationObj.name = "album title is required"
        }

        if (!image) {
            validationObj.image = "album cover image is required \n(accept pdf, png, jpg, jpeg, gif)\n"
        } else {
            const fileType = image.type
            console.log("file type=====================>", fileType)
            const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'application/pdf']
            if (! validTypes.includes(fileType)) {
                validationObj.imagetype = "Invalid file type, only PDF, PNG, JPG, JPEG, GIF are allowed" 
            }
        }

        setErrors(validationObj)
    }, [name, image])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            const formData = new FormData();
            formData.append("cover_img", image);
            formData.append("name", name)

            const res = await fetch("/api/users/current/albums", {
                method: "POST",
                body: formData
            });
            setImageLoading(true);
            const data = await res.json()
            console.log(data)
            navigate("/")
        }
    }

    return (
        <div className="main-form">
            <div className="create-container">
                <h1>Create an Album</h1>
                <form
                    onSubmit={handleSubmit}
                    encType="multipart/form-data"
                    className="form-data"
                >
                    <label>
                        Album Title
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="name-input"
                        />
                        <div>{errors.name && <p className="create-album-validator">{errors.name}</p>}</div>
                    </label>

                    <label>
                        Cover Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="name-input"
                        />
                        <div>{errors.image && <p className="create-album-validator">{errors.image}</p>}</div>
                        <div>{errors.imagetype && <p className="create-album-validator">{errors.imagetype}</p>}</div>
                    </label>

                    <button type="submit" id="submit_button">Submit</button>
                    {(imageLoading) && <p>Loading...</p>}
                </form>
            </div>
        </div>
    )
}

export default CreateAlbumModal;
