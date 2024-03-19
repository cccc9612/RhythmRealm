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
        setShowMenu(!showMenu);
    }
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

const isOwner = song.artist_id == user.id

return (
    <>


    </>
)
