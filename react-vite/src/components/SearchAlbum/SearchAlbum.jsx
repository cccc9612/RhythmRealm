import { useState } from "react";
import './SearchAlbum.css'
import AlbumItem from "../Albums/AlbumItem";
import { NavLink } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";


function SearchAlbum() {
    const [text, setText] = useState("")
    const [albums, setAlbums] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false)

    const searchAlbums = async() => {
        setSearchAttempted(true)
        const res = await fetch(`/api/search/albums?search=${encodeURIComponent(text)}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })

        if(res.ok) {
            const data = await res.json();
            console.log("data", data)
            setAlbums(data.albums)
        }
    }

    return (
        <>
        <div>
            <div className="search-album-bar-container">
                <IoSearchOutline className="search-icon"/>
                <input
                    placeholder="What do you want to play?"
                    type="text" 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    onClick={() => searchAlbums()}
                >
                    Search
                </button>
            </div>
            { searchAttempted && albums.length === 0 ? (<p>No results found</p>) : (
            <>
            <div className="album-list-container">
                {searchAttempted? <h3>Albums</h3> : null}
                <div className="albums-container">
                    {albums.map((album) => (
                        <NavLink key={album.id} to={`/albums/${album.id}`}>
                            <AlbumItem album={album} />
                        </NavLink>
                    ))}

                </div>
            </div>
            </>
            ) 
            }
        </div>
        </>
    )
}


export default SearchAlbum;