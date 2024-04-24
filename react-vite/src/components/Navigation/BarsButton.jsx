import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router";
import "./BarsButton.css"


function BarsButton() {
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const navigate = useNavigate();

    const toggleMenu = (e) => {
        e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
        setShowMenu(!showMenu);
    };

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

    const songsSearchClick = (e) => {
        e.preventDefault();
        navigate("/search/songs");
        closeMenu();
    } 

    const albumsSearchClick = (e) => {
        e.preventDefault();
        navigate("/search/albums");
        closeMenu();
    } 

    const allSongsClick = (e) => {
        e.preventDefault();
        navigate("/songs");
        closeMenu();
    } 

    const allAlbumsClick = (e) => {
        e.preventDefault();
        navigate("/albums");
        closeMenu();
    } 




    return (
        <>
        <div onClick={toggleMenu} >
            <i className="fa-solid fa-bars bars-icon"></i>
        </div>
        {showMenu && (
            <ul className="bars-dropdown">
                <p onClick={songsSearchClick}>Songs search</p>
                <p onClick={albumsSearchClick}>Albums search</p>
                <p onClick={allSongsClick}>All songs</p>
                <p onClick={allAlbumsClick}>All albums</p>
            </ul>
        )}
        </>
    )
}

export default BarsButton;