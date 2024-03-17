import "./SongItem.css"

function SongItem({ song, index}) {

    return (
        <>
            <span  className="first-col">{index + 1}</span>
            <span className="second-col">
                <img src={song.album?.cover_img} />
                <span className="song-name-artist">
                    <span>{song.song_name}</span>
                    <span>{song.artist.first_name} {song.artist.last_name}</span>
                </span>
            </span>
            <span>{song.album?.name}</span>
            <span>{song.likes}</span>
            <span>{song.duration}</span>
        </>
    )
}

export default SongItem;
