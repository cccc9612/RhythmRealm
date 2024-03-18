import AudioPlayer from 'react-h5-audio-player';

import 'react-h5-audio-player/lib/styles.css';

import './MusicPlayer.css'

function MusicPlayer() {
  // const nextSong() {

  // }

  return <AudioPlayer
    autoPlay={false}
    // src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
    src="https://rhythm-realm-img-bucket.s3.amazonaws.com/aa96c80eed2943c89441034a13b70e78.mp3"
    onPlay={e => console.log("onPlay", e)}
    showSkipControls={true}
    showJumpControls={false}
    // onClickNext={nextSong}
    // style={{ width: '600px'}}
    layout="stacked-reverse"
  // other props here
  />;
}

export default MusicPlayer;
