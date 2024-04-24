import { useState } from "react";
import { useSelector } from "react-redux";
import SongItem from "../Songs/SongItem";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineClock } from "react-icons/hi2";
import './SearchSong.css'

function SearchSong() {
    const [text, setText] = useState("")
    const [songs, setSongs] = useState([])
    const [searchAttempted, setSearchAttempted] = useState(false)
    const [num, setNum] = useState(0);
    const sessionUser = useSelector(state => state.session.user);

    const searchSongs = async () => {
        const res = await fetch(`/api/search/songs?param=${encodeURIComponent(text)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })

        if (res.ok) {
            const data = await res.json();
            console.log("data", data)
            setSongs(data.songs)
        }
        setSearchAttempted(true)
    }

    const clickRerender = () => {
        setNum(num + 1);
      }


    return (
        <>
            <div>
                <div className="search-album-bar-container">
                    <IoSearchOutline className="search-icon" />
                    <input
                        placeholder="What do you want to play?"
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        onClick={() => searchSongs()}
                    >
                        Search
                    </button>
                    <span className="rerender-btn" onClick={clickRerender}>{num}</span>
                </div>
                {searchAttempted && (songs.length === 0 ? (<p>No results found</p>) : (
                    <>
                        {searchAttempted ? (
                            <>
                                <h3 className="search-song-h3">Songs</h3>
                                <div className="song-list-row-title-search">
                                    <span className="first-col">#</span>
                                    <span className="second-col">Title</span>
                                    <span className="search-song-title-span third-col">Album</span>
                                    <span className="search-song-likes-span like-container">Likes</span>
                                    <span className="search-song-duration-span fifth-col"><HiOutlineClock /></span>
                                </div>
                            </>
                        ) : null}

                        {songs.map((song, index) => (
                            <div className="song-list-row" key={song.id}>
                                <SongItem song={song} index={index} user={sessionUser} songs={songs} />
                            </div>
                        ))}
                    </>
                )
                )}
            </div>
        </>
    )
}

export default SearchSong;
