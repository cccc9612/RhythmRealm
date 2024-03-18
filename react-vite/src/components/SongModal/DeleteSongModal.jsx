import { useNavigate } from "react-router-dom"
import { useModal } from "../../context/Modal";
import "./DeleteSong.css"
import { useDispatch } from "react-redux";
import { deleteSongThunk } from "../../redux/song";


const DeleteSongModal = ({ song }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (songId) => {
        dispatch(deleteSongThunk(songId))
        navigate('/songs')
    }

    return (
        <div className="delete-song-modal">
            <div className="delete-info-modal">
                <h2 className="delete-header-text">Are you sure you want to delete &quot;{`${song.song_name}`}&quot;?</h2>
                <div className="delete-buttons-holder">
                    <button className='cancel-modal-button' type="button" onClick={closeModal}>Cancel</button>
                    <button className="delete-modal-button" onClick={() => {
                        closeModal()
                        handleDelete(song.id)
                    }
                    }>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteSongModal
