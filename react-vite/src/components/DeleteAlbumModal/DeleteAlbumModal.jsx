import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteAlbum } from "../../redux/album";
import './DeleteAlbumModal.css'

function DeleteAlbumModal({albumId}) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteAlbum(albumId));
        closeModal();
    }


    return (
        <div className="deleteAlbumModal-container">
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to delete this album?</p>
            <button className='deleteAlbumModal-yes-button'onClick={handleDelete}>Yes (Delete Album)</button>
            <button className='deleteAlbumModal-no-button'onClick={closeModal}>No (Keep Album)</button>
        </div>
    )
}

export default DeleteAlbumModal;