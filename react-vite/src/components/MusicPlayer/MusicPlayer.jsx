import AudioPlayer from 'react-h5-audio-player';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaylistAction } from '../../redux/playlist';
import { getAllSongs } from '../../redux/song';
import { IoMdHeartEmpty } from "react-icons/io";

import 'react-h5-audio-player/lib/styles.css';

import './MusicPlayer.css'

function MusicPlayer() {
  const dispatch = useDispatch();
  // const songState = useSelector(state => state.song);
  // const songs = Object.values(songState?.Songs)

  const playlistState = useSelector(state => state.playlist);
  const playlist = playlistState?.Songs;
  const playIndex = playlistState?.playIndex;
  const sliceIndex = playlistState?.sliceIndex;
  const [songIdx, setSongIdx] = useState(playIndex || 0)
  // const [sliceIdx, setSliceIdx] = useState(sliceIndex || 0)

  // console.log("====== playlist ===>", playlist)
  useEffect(() => {
    dispatch(getAllSongs())
    .then((res) => {
      // console.log("musicplayer playlist ", res.songs.slice(sliceIdx), songIndex);
      // dispatch(loadPlaylistAction(res.songs))
      dispatch(loadPlaylistAction(res.songs.slice(sliceIndex)))
    })
    // dispatch(setPlayIndexAction(songIndex))
    setSongIdx(0)
  }, [dispatch, sliceIndex])


  const handleClickPrevious = () => {
    const idx = songIdx === 0 ? playlist.length - 1 : songIdx - 1;
    setSongIdx(idx)
  }

  const handleClickNext = () => {
    const idx = songIdx < playlist.length - 1 ? songIdx + 1 : 0;
    setSongIdx(idx)
  }
  console.log("*****************", songIdx, playIndex)
  return (
    <div className='player-container'>
      <span className="song-player">
        <img src={playlist[songIdx]?.album?.cover_img} />
        <span className="song-name-artist-player">
          <span className="song-name-player">{playlist[songIdx]?.song_name}</span>
          <span id='song-artist-player-id' className="song-artist-player">{playlist[songIdx]?.artist.first_name} {playlist[songIdx]?.artist.last_name}</span>
        </span>
        <span className="like-heart"><IoMdHeartEmpty size={20} /></span>
      </span>
      <div>
        <AudioPlayer
          autoPlay={false}
          style={{ width: "500px", height: "80px", backgroundColor: "black"}}
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
    </div>
  )
}

export default MusicPlayer;
