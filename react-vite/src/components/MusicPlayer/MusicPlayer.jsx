import AudioPlayer from 'react-h5-audio-player';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaylistAction, setPlayIndexAction } from '../../redux/playlist';
import { getAllSongs } from '../../redux/song';
import { IoMdHeartEmpty } from "react-icons/io";

import 'react-h5-audio-player/lib/styles.css';

import './MusicPlayer.css'

function MusicPlayer() {
  const dispatch = useDispatch();
  // const songState = useSelector(state => state.song);
  // const songs = Object.values(songState?.Songs)

  const playlistState = useSelector(state => state.playlist);
  const playlist = Object.values(playlistState?.Songs)
  const playIndex = playlistState?.index;
  const [songIndex, setSongIndex] = useState(playIndex || 0)

  useEffect(() => {
    dispatch(getAllSongs())
    .then((res) => {
      dispatch(loadPlaylistAction(res.songs))
    })
    dispatch(setPlayIndexAction(songIndex))
  }, [dispatch, songIndex])

  const handleClickPrevious = () => {
    const idx = songIndex === 0 ? playlist.length - 1 : songIndex - 1;
    setSongIndex(idx)
  }

  const handleClickNext = () => {
    const idx = songIndex < playlist.length - 1 ? songIndex + 1 : 0;
    setSongIndex(idx)
  }

  return (
    <div className='player-container'>
      <span className="song-player">
        <img src={playlist[songIndex]?.album?.cover_img} />
        <span className="song-name-artist-player">
          <span className="song-name-player">{playlist[songIndex]?.song_name}</span>
          <span id='song-artist-player-id' className="song-artist-player">{playlist[songIndex]?.artist.first_name} {playlist[songIndex]?.artist.last_name}</span>
        </span>
        <span className="like-heart"><IoMdHeartEmpty size={20} /></span>
      </span>
      <div>
        <AudioPlayer
          autoPlay={false}
          style={{ width: "500px", height: "80px", backgroundColor: "black"}}
          src={playlist[songIndex]?.song_url}
          onPlay={() => console.log("Playing song ", songIndex, playlist[songIndex]?.song_name)}
          showSkipControls={true}
          showJumpControls={false}
          layout="stacked-reverse"
          onClickPrevious={handleClickPrevious}
          onClickNext={handleClickNext}
          showFilledVolume={true}
          onEnded={handleClickNext}
        />

      </div>
    </div>
  )
}

export default MusicPlayer;
