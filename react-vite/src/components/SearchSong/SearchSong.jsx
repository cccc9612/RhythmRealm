import { useState } from "react";
import './SearchSong.css'
import SongItem from "../Songs/SongItem";

function SearchSong() {
    const [text, setText] = useState("")
    const [songs, setSongs] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false)

    const searchSongs = async() => {
        setSearchAttempted(true)
        const res = await fetch(`/api/search/songs?param=${encodeURIComponent(text)}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        })

        if(res.ok) {
            const data = await res.json();
            console.log("data", data)
            setSongs(data.songs)
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
                onClick={() => searchSongs()}
            >
                Search
            </button>
            { searchAttempted && songs.length === 0 ? (<p>No results found</p>) : (
            <>
            {searchAttempted? (
                <>
                <h3>Songs</h3>
                <div className="song-list-row-title">
                    <span className="first-col">#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span>Likes</span>
                    <span>Duration</span>
                </div>
                </>
            ) : null}
            
                {songs.map((song, index) => (
                    <div className="song-list-row" key={song.id}>
                    <SongItem song={song} index={index} />
                    </div>
                ))}
            </>
            ) 
            }
        </div>
        </>
    )
}

export default SearchSong;