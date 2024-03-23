import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSong from "../DeleteSong/DeleteSong"
import AddToAlbum from "../Albums/AddToAlbum/AddToAlbum"
import "./SongDropdown.css"


function SongDropdown({ song }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
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

    const owner = song?.artist.id == user.id

    return (
        <>
            <span>
                <span className="dropdown-icon">
                    <i style={{ fontSize: 25 }} className="fa-solid fa-ellipsis" onClick={toggleMenu}>


                    </i>
                    {showMenu && (
                        <span className={"manage-song-dropdown"} ref={ulRef}>
                            {owner && (
                                <>
                                    <ul className="dropdown-edit">
                                        <i className="fa-solid fa-pen"></i>
                                        <span className="dropdown-list" onClick={() => navigate(`/songs/${song.id}/edit`)}>Update</span>
                                    </ul>
                                    <ul className="dropdown-edit">
                                        <i className="fa-solid fa-circle-minus"></i>
                                        <span className="dropdown-list">
                                            <OpenModalMenuItem
                                                itemText="Delete"
                                                onItemClick={closeMenu}
                                                modalComponent={<DeleteSong song={song} />} />
                                        </span>
                                    </ul>
                                </>
                            )}
                            {owner && (
                                <ul className="dropdown-edit">
                                    <i className="fa-solid fa-square-plus"></i>
                                    <span className="dropdown-list">
                                        {song.album?.id ? <Link to={`/albums/${song.album?.id}`}>{song.album.name}</Link> :
                                            (<OpenModalMenuItem
                                                itemText='Add to Album'
                                                onItemClick={closeMenu}
                                                modalComponent={<AddToAlbum song={song} />} />)
                                        }
                                    </span>
                                </ul>
                            )}
                        </span>
                    )}
                </span>
            </span>
        </>
    )

}

export default SongDropdown;
