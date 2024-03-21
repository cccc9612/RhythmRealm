import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../redux/song";
import "./DeleteSong.css"

const DeleteSong = ({ song }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleDelete = (songId) => {
        dispatch(deleteSongThunk(songId))
        closeModal()
    }

    return (
        <div className="delete-song-modal">
            <div className="confirmation-container">
                <h2 className="confirmation-header">Are you sure you want to delete &quot;{`${song.song_name}`}&quot;?</h2>
                <div className="confirmation-buttons">
                    <button className="delete-button" onClick={() => {
                        handleDelete(song.id)
                        closeModal()
                    }}>Delete</button>
                    <button className='cancel-button' type="button" onClick={closeModal}>Cancel</button>
                </div>
            </div>
        </div>
    )

}
export default DeleteSong
