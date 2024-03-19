import { useState } from "react";
import './SearchAlbum.css'
import AlbumItem from "../Albums/AlbumItem";
import { NavLink } from "react-router-dom";


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
            <input
                type="text" 
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={() => searchAlbums()}
            >
                Search
            </button>
            { searchAttempted && albums.length === 0 ? (<p>No results found</p>) : (
            <>
            <div className="album-list-container">
                {searchAttempted? <h3>Albums</h3> : null}
                <div className="albums-container">
                    {albums.map((album, index) => (
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