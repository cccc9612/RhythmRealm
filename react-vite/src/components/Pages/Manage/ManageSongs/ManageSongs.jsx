// function ManageSongs() {
//   return <h2>Manages Songsaaaa</h2>
// }



import { useDispatch, useSelector } from "react-redux";
import { useEffect, useContext, useState } from "react";
import { getAllSongs } from "../../../../redux/song";
import { getAllAlbums } from "../../../../redux/album";
import { loadUsersThunk } from "../../../../redux/user";
import { MusicContext } from "../../../../context/MusicContext";
import SongList from "../../../Songs/SongList/SongList";
import { useNavigate } from "react-router-dom";
import { IndexContext } from "../../../../context/IndexContext";


function ManageSongs() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [songList, setSongList] = useContext(MusicContext);
  const [currentSong, setCurrentSong] = useContext(IndexContext);
  const [playing, setPlaying] = useState(false);
  const [counter, setCounter] = useState(0);
  if (currentSong) currentSong

  useEffect(() => {
    dispatch(getAllSongs())
    dispatch(getAllAlbums())
    dispatch(loadUsersThunk())
  }, [dispatch])

  if (!songList) songList

  const user = useSelector(state => state.session.user)
  if (!user) navigate('/')
  const users = useSelector(state => state.users)
  const albums = useSelector(state => state.albums)

  const songs = useSelector(state => state.songs)
  const keys = Object.keys(songs)
  const values = Object.values(songs)
  // // console.log(songs)

  console.log(users);
  console.log(albums);
  console.log(songs);


  const handleClick = () => {
    if (counter == 0) {
      // setSongList(values);
      setSongList([]);
      setCurrentSong(0);
      setPlaying(true);
    } else {
      setPlaying(!playing);
      const audio = document.getElementsByTagName('audio')[0]
      if (playing) {
        audio.pause()
      }
      if (!playing) {
        audio.play()
      }
    }
    setCounter(counter + 1);
  }

  return (
    <section className="page-container">
      <div className="songs-header">
        <h2>Manage ssssongs</h2>
        <div className="all-songs-info">
          <p style={{ fontSize: 14, color: '#b3b3b3' }}>Library</p>
          <h1 className="all-songs-title">All Songs</h1>
          <p style={{ fontSize: 14, color: '#b3b3b3', whiteSpace: 'nowrap' }}>All the songs in our library.</p>
        </div>
      </div>
      <div className="all-songs-list">
        <div className="song-list-symbols">
          <div className="song-play-button" onClick={() => handleClick()}>
            {!playing ? <i className="fa-solid fa-play fa-2xl play-icon"></i> : <i className="fa-solid fa-pause fa-2xl play-icon"></i>}
          </div>
        </div>
        <div className="song-list-info-header">
          <div className="hashtag-title">
            <p className="hashtag">#</p>
            <p>Title</p>
          </div>
          <p style={{ paddingRight: 254 }}>Album</p>
          <div className="heart-duration">
            <i className="fa-regular fa-clock duration-icon"></i>
          </div>
        </div>
        <div className="song-info">
          {/* {users &&
            keys.map((id) => (
              <SongList key={id}
              songs={values}
              count={id}
              user={user.id}
              song={songs[id]}
              albums={albums}
              artist={users[songs[id]['artist_id']]}
              changePlay={setPlaying}
              changeCount={setCounter} />
            ))
          } */}
          <SongList />
        </div>
      </div>
    </section>
  )
}

export default ManageSongs;
