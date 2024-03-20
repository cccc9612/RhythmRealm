import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSong from "../DeleteSong/DeleteSong"
import "./SongDropdown.css"


function SongDropdown({ song }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        // console.log('byeeeeee')
        setShowMenu(!showMenu);
        // console.log('heloooooo')
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

    const owner = song.artist_id == user.id

    return (
        <>
            <span>
                <i style={{ fontSize: 25 }} className="fa-solid fa-ellipsis" onClick={toggleMenu}></i>
                {showMenu && (
                    <span className="manage-song-dropdown" ref={ulRef}>
                        {user && (
                            <>
                                {owner && (
                                    <div className="playlist-delete-drop">
                                        <i className="fa-solid fa-square-plus bar-icon"></i>
                                        <span className="album-dropdown-item">
                                            <OpenModalMenuItem itemText='Add to Album' onItemClick={closeMenu} modalComponent={<AddToAlbum song={song} />} />
                                        </span>
                                    </div>
                                )}
                                {owner && (
                                    <>
                                        <div className="playlist-delete-drop">
                                            <i className="fa-solid fa-pen"></i>
                                            <span className="album-dropdown-item" onClick={() => navigate(`/current/songs/${song.id}/update`)}>Update</span>
                                        </div>
                                        <div className="playlist-delete-drop">
                                            <i className="fa-solid fa-circle-minus"></i>
                                            <span className="album-dropdown-item">
                                                <OpenModalMenuItem
                                                    itemText="Delete"
                                                    onItemClick={closeMenu}
                                                    modalComponent={<DeleteSong song={song} />} />
                                            </span>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </span>
                )}
            </span>
        </>
    )

}

export default SongDropdown;
