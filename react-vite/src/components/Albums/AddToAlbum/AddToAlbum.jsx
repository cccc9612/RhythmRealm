import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { getAllSongs } from "../../../redux/song";
import { getCurrentAlbums } from "../../../redux/album";
import { addToAlbumThunk } from "../../../redux/song";
import { useModal } from "../../../context/Modal";
import "./AddToAlbum.css"

function AddToAlbum({song}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const songState = useSelector(state => state.song);
    // const songs = Object.values(songState?.Songs);
    // console.log("songs in component=========", songs)
    const songId = song.id

    const albumState = useSelector(state => state.album);
    const albums = Object.values(albumState?.Albums);

    useEffect(() => {
        // dispatch(getAllSongs());
        dispatch(getCurrentAlbums());
    }, [dispatch]);



    const handleAdd = (albumId) => (e) => {
        e.preventDefault();
        console.log("albumId in component======", albumId)
        if (!albumId) return;
        dispatch(addToAlbumThunk(albumId, songId))
        console.log("after dispatch===========")
        closeModal();
    }



    return (
        <div>
            <h2>AddToAlbum</h2>
            {albums?.map((album) => (
                <div key={album.id}>
                    <span>{album.name}</span>
                    <span><button onClick={handleAdd(album.id)}>add</button></span>
                </div>
            ))}
            {/* <div className="album-detail-songs-container"> */}
            {/* <h3 className="search-song-h3">Songs</h3> */}
                {/* <div className="song-list-row-title"> */}
                    {/* <span className="first-col">#</span> */}
                    {/* <span>Title</span> */}
                    {/* <span>Album</span> */}
                    {/* <span>Likes</span> */}
                    {/* <span>Duration</span> */}
                {/* </div> */}
            {/* {songs?.map((song, index) => ( */}
                {/* <div className="song-list-row" key={song.id}> */}
                    {/* <span className="first-col">{index + 1}</span> */}
                    {/* <span className="second-col"> */}
                        {/* <img src={song.album?.cover_img} /> */}
                        {/* <span className="song-name-artist"> */}
                            {/* <span className="song-name">{song.song_name}</span> */}
                            {/* <span>{song.artist.first_name} {song.artist.last_name}</span> */}
                        {/* </span> */}
                    {/* </span> */}
                    {/* <span className="like-container"> */}
                        {/* {song.likes} */}
                    {/* </span> */}
                    {/* <span>{song.duration}</span> */}
                    {/* {song.album?.id? <span>{song.album.name}</span> : ( */}
                    {/* <span> */}
                        {/* <select onChange={(e) => handleAdd(e.target.value)}> */}
                            {/* <option value="">Add to album</option> */}
                            {/* {albums?.map((album) => { */}
                                {/* return ( */}
                                        {/* <option */}
                                            {/* value={album.id} */}
                                            {/* key={album.id}> */}
                                            {/* {album.name} */}
                                        {/* </option> */}
                                {/* ) */}
                            {/* })} */}
                        {/* </select> */}
                    {/* </span> */}
                    {/* )} */}
                {/* </div> */}
            {/* ))} */}
            {/* </div> */}
        </div>
    )
}

export default AddToAlbum
