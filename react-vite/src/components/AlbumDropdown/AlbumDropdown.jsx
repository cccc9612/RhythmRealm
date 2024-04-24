import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteAlbumModal from "../DeleteAlbumModal/DeleteAlbumModal";
import RemoveSongsModal from "../RemoveSongsModal";
// import AddToAlbum from "../Albums/AddToAlbum/AddToAlbum"
import "./AlbumDropdown.css"


function AlbumDropdown({ album }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        document.body.click()
        setShowMenu(!showMenu);
        // console.log("------", owner)
        // console.log("song.artist.id:", song.artist.id)
        // console.log("user.id:", user.id)
        // console.log("song", song)
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const owner = album?.artist.id == user.id

    return (

            <span  className="dropdown-icon-container">
                <span className="dropdown-icon">
                    <i style={{ fontSize: 25 }} className="fa-solid fa-ellipsis" onClick={toggleMenu}></i>
                </span>
                {showMenu && (
                    <span className={"manage-album-dropdown"} ref={ulRef}>
                        {owner && (
                            <>
                                <ul className="dropdown-edit">
                                    <i className="fa-solid fa-pen"></i>
                                    <span className="dropdown-list" onClick={() => navigate(`/albums/${album.id}/edit`)}>Update</span>
                                </ul>
                                <ul className="dropdown-edit">
                                    <i className="fa-solid fa-circle-minus"></i>
                                    <span className="dropdown-list">
                                        <OpenModalMenuItem
                                            itemText="Delete"
                                            onItemClick={closeMenu}
                                            modalComponent={<DeleteAlbumModal albumId={album.id} />} />
                                    </span>
                                </ul>
                                <ul className="dropdown-edit">
                                  <i className="fa-solid fa-square-plus"></i>
                                  <span className="dropdown-list" onClick={() => navigate(`/users/current/songs`)}>Add songs</span>
                                </ul>
                                <ul className="dropdown-edit">
                                    <i className="fa-solid fa-square-minus"></i>
                                    <span className="dropdown-list">
                                        <OpenModalMenuItem
                                            itemText="Remove songs"
                                            onItemClick={closeMenu}
                                            modalComponent={<RemoveSongsModal albumId={album.id} />} />
                                    </span>
                                </ul>
                            </>
                        )}

                    </span>
                )}
            </span>

    )

}

export default AlbumDropdown;
