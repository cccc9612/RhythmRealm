import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../redux/song";
import "./DeleteSong.css"

const DeleteSong = ({ song }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (songId) => {
        dispatch(deleteSongThunk(songId))
        navigate('/users/current/songs')
    }

    return (
        <div className="delete-song-modal">
            <div className="confirmation-container">
                <h2 className="confirmation-header">Are you sure you want to delete &quot;{`${song.song_name}`}&quot;?</h2>
                <div className="confirmation-buttons">
                    <button className='cancel-button' type="button" onClick={closeModal}>Cancel</button>
                    <button className="delete-button" onClick={() => {
                        closeModal()
                        handleDelete(song.id)
                    }}>Delete</button>
                </div>
            </div>
        </div>
    )

}
export default DeleteSong
