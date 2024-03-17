import { useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateAlbumModal() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)
    // const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("cover_img", image);
        formData.append("name", name)

        const res = await fetch("/api/users/current/albums", {
            method: "POST",
            body: formData
        });
        setImageLoading(true);
        // await dispatch()
        const data = await res.json()
        console.log(data)
        navigate("/")        
    }

    return (
        <>
            <h1>Create an Album</h1>
            <form
               onSubmit={handleSubmit}
               encType="multipart/form-data" 
            >
                <label>
                    Album Title
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                </label>
               
                <label>
                    Cover Image File
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </label>

                <button type="submit">Submit</button>
                {(imageLoading)&& <p>Loading...</p>}
            </form>
        </>
    )
}

export default CreateAlbumModal;