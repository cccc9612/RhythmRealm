import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSongs } from "../../../redux/song";
import SongItem from "../SongItem";

import './AllSongList.css'


function AllSongList() {
    const dispatch = useDispatch();
    const songState = useSelector(state => state.song);
    const songs = Object.values(songState?.Songs);
    const [page, setPage] = useState(0);

    const limit = 5;
    let songsDisplay = songs.slice(page * limit, (page + 1) * limit)

    useEffect(() => {
        dispatch(getAllSongs());
    }, [dispatch]);

    const handlePrevPage = () => {
        if (page - 1 >= 0) {
            setPage(page - 1)
        }
    }

    const handleNextPage = () => {
        if (page + 1 < Math.ceil(songs.length / limit)) {
            setPage(page + 1)
        }
    }

    return (
        <div className="song-list-container">
            <div className="title-container">
                <h3>All songs</h3>
                <div>
                    <button className="prev-page-click"
                        onClick={handlePrevPage}
                        disabled={page == 0 ? true : false}>
                        Prev
                    </button>
                    <span> </span>
                    <button className="next-page-click"
                        onClick={handleNextPage}
                        disabled={page == Math.ceil(songs.length / limit) - 1 ? true : false  }>
                        Next
                    </button>
                </div>
            </div>
            <div className="song-list">
                <div className="song-list-row-title">
                    <span className="first-col">#</span>
                    <span>Title</span>
                    <span>Album</span>
                    <span>Likes</span>
                    <span>Duration</span>
                </div>
                {songsDisplay?.map((song, index) => {
                    return (
                        <div className="song-list-row" key={song.id}>
                            <SongItem song={song} index={index} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AllSongList;
