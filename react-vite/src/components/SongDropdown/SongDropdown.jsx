import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteSong from "../DeleteSong/DeleteSong"
import AddToAlbum from "../Albums/AddToAlbum/AddToAlbum"
import "./SongDropdown.css"


function SongDropdown({ id, song }) {
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false);
    const user = useSelector((store) => store.session.user);
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        document.body.click()

        setShowMenu(!showMenu);

    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            // console.log("22222222222222222222", ulRef.current, e.target)
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
            <span className="dropdown-icon-container">
                <span className="dropdown-icon">
                    <i style={{ fontSize: 25 }} className="fa-solid fa-ellipsis" id={id} onClick={toggleMenu}></i>
                </span>
                {showMenu && (
                    <span className={"manage-song-dropdown"} id={'dropdown-'+id} ref={ulRef}>
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
                        {owner &&
                            (song.album?.id ?
                              <ul className="dropdown-edit assigned">
                                <i className="fa-solid fa-square-plus"></i>
                                <span className="dropdown-list">
                                  <span>{song.album.name}</span>
                                </span>
                              </ul> :
                              <ul className="dropdown-edit">
                                <i className="fa-solid fa-square-plus"></i>
                                <span className="dropdown-list">
                                  <OpenModalMenuItem
                                    itemText='Add to Album'
                                    onItemClick={closeMenu}
                                    modalComponent={<AddToAlbum song={song} />} />
                                </span>
                              </ul>
                            )
                        }
                    </span>
                )}
            </span>
        </>
    )

}

export default SongDropdown;
