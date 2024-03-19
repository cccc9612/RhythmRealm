const GET_ALL_SONGS = 'song/getAllSongs';
const GET_SINGLE_SONG = 'song/getSingleSong'
const DELETE_SONG = 'song/deleteSong';

// action
const getAllSongsAction = (songs) => {
  return {
    type: GET_ALL_SONGS,
    payload: songs
  }
}

const getSingleSong = (song) => {
  return {
    type: GET_SINGLE_SONG,
    song
  }
}

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId
  }
}

// Thunk Creators
export const getAllSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs');
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getAllSongsAction(data.songs));
  return data
}

export const getSingleSongThunk = (songId) => async (dispatch) => {
  const res = await fetch(`/api/songs/${songId}`)

  if (res.ok) {
    const data = await res.json()
    dispatch(getSingleSong(data))
    return data
  }
}


export const deleteSongThunk = (songId) => async (dispatch) => {
  console.log(songId)
  const res = await fetch(`/api/users/current/songs/${songId}`, {
    method: "DELETE",
    body: songId
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(deleteSong(songId))
    return data
  }

}





const initialState = { Songs: {} };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Songs: { ...newObj } };
    }
    // case LOAD_ONE_SONG: {
    //   const newState = {}
    //   newState[action.song.id] = action.song
    //   return newState
    // }
    case DELETE_SONG: {
      const newState = { ...state }
      delete newState[action.songId]
      return newState;
    }
    default:
      return state;
  }
}




export default songReducer;
