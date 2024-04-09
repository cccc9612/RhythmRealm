import AudioPlayer from 'react-h5-audio-player';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { loadPlaylistAction } from '../../redux/playlist';
// import { getAllSongs } from '../../redux/song';
// import { likeSongThunk, dislikeSongThunk } from '../../redux/song';
// import { IoMdHeartEmpty } from "react-icons/io";
// import { IoMdHeart } from "react-icons/io";

import 'react-h5-audio-player/lib/styles.css';

import './MusicPlayer.css'
// import { IoConstructOutline } from 'react-icons/io5';

function MusicPlayer() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;

  const songState = useSelector(state => state.song);
  const songs = Object.values(songState?.Songs)
  // const sessionUser = useSelector(state => state.session.user);
  const playlistState = useSelector(state => state.playlist);
  const playlist = playlistState?.Songs;
  let playIndex = playlistState?.playIndex;
  // const sliceIndex = playlistState?.sliceIndex;
  const [songIdx, setSongIdx] = useState(playIndex || 0)
  const [num, setNum] = useState(0)
  // const [sliceIdx, setSliceIdx] = useState(sliceIndex || 0)



  useEffect(() => {
    if (pathname === "/") {
      if (!songs.length) {
        if (songs.length > 10) {
          dispatch(loadPlaylistAction(songs.toSorted((a, b) => {
            return (new Date(b.created_at)) - (new Date(a.created_at));
          }).slice(0,10)))
        }
      }
    }
    // console.log("reder ==== musci player")
    // dispatch(setPlayIndexAction(songIndex))
    setSongIdx(playIndex);

  }, [dispatch, playIndex, num])


  const handleClickPrevious = () => {
    const idx = songIdx === 0 ? playlist.length - 1 : songIdx - 1;
    setSongIdx(idx)
  }

  const handleClickNext = () => {
    const idx = songIdx < playlist.length - 1 ? songIdx + 1 : 0;
    setSongIdx(idx)
  }

  // this function to be called to re-render music player to update songs
  const clickRerender = () => {
    setNum(num + 1);
  }

  // const checkLikes = (song, user) => {
  //   return song.users_like.map(el => el.id).includes(user.id)
  // }

  // const toggleDislike = async () => {
  //   // const like = document.getElementById(e.currentTarget.id);
  //   await dispatch(dislikeSongThunk(playlist[songIdx]?.id));
  //   const rerender = document.getElementsByClassName("rerender-btn")[0];
  //   rerender.click();
  // }

  // const toggleLike = async () => {
  //   // const like = document.getElementById(e.currentTarget.id);
  //   await dispatch(likeSongThunk(playlist[songIdx]?.id));
  //   const rerender = document.getElementsByClassName("rerender-btn")[0];
  //   rerender.click();
  // }


  return (
    <div className='player-container'>
      <span className="song-player">
        <img src={playlist[songIdx]?.album?.cover_img ?
          `${playlist[songIdx]?.album?.cover_img}` :
          "https://live.staticflickr.com/65535/53600353900_d12bfa5f73_k.jpg"} />
        <span className="song-name-artist-player">
          <span className="song-name-player">
            {playlist[songIdx]?.song_name}
          </span>
          <span id='song-artist-player-id' className="song-artist-player">
            {playlist[songIdx]?.artist.first_name} {playlist[songIdx]?.artist.last_name}
          </span>
        </span>
        {/* {sessionUser && playlist[songIdx] &&
          checkLikes(playlist[songIdx], sessionUser) ?
          <span className="like-heart hold" id={"mp-song-" + playlist[songIdx]?.id} onClick={toggleDislike}><IoMdHeart size={20} /></span> :
          <span className="like-heart" id={"mp-song-" + playlist[songIdx]?.id} onClick={toggleLike}><IoMdHeartEmpty size={20} /></span>} */}
      </span>
      <div className='player-wrapper'>
        <AudioPlayer
          autoPlay={false}
        //   style={{ width: "500px", height: "80px", backgroundColor: "black" }}
          id="musicplayer"
          className='musicplayer-container'
          src={playlist[songIdx]?.song_url}
          onPlay={() => console.log("Playing song ", songIdx, playlist[songIdx]?.song_name)}
          showSkipControls={true}
          showJumpControls={false}
          layout="stacked-reverse"
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          showFilledVolume={true}
          onEnded={handleClickNext}
        />

      </div>
      <div className='rerender-btn-container'>

        <span className="rerender-btn" onClick={clickRerender}>{num}</span>
      </div>
    </div>
  )
}

export default MusicPlayer;
