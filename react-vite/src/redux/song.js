const GET_ALL_SONGS = 'song/getAllSongs';
const GET_SINGLE_SONG = 'song/getSingleSong'
const DELETE_SONG = 'song/deleteSong';
const ADD_A_SONG = 'song/addSong'
const UPDATE_A_SONG = 'song/updateSong'
const ADD_TO_ALBUM = 'album/addToAlbum';


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


const addSong = (song) => {
  return {
    type: ADD_A_SONG,
    song
  }
}

const updateSong = (song) => {
  return {
    type: UPDATE_A_SONG,
    song,
  }
}

const deleteSong = (songId) => {
  return {
    type: DELETE_SONG,
    songId
  }
}

// const addToAlbumAction = (albumId, songId) => {
//   return {
//     type: ADD_TO_ALBUM,
//     payload: {
//       albumId,
//       songId
//     }
//   }
// }



// Thunk Creators
export const getAllSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs');
  const data = await response.json();

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

export const getCurrentSongs = () => async (dispatch) => {
  const response = await fetch('/api/users/current/songs', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  const data = await response.json()
  if (response.ok) {
    dispatch(getAllSongsAction(data.songs))
    return data;
  }

  return response;
}


export const addSongThunk = (song) => async (dispatch) => {
  const res = await fetch('/api/songs/new', {
    method: "POST",
    body: song
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(addSong(data))
    return data
  }

}

export const updateSongThunk = (song, songId) => async (dispatch) => {
  const res = await fetch(`/api/users/current/songs/${songId}/update`, {
    method: "PUT",
    body: song
  })

  if (res.ok) {
    const data = await res.json()
    dispatch(updateSong(data))
    return data
  }
}

export const deleteSongThunk = (songId) => async (dispatch) => {

  const res = await fetch(`/api/users/current/songs/${songId}/delete`, {

    method: "DELETE",
    headers: { 'Content-Type': 'application/json' }
  })

  if (res.ok) {
    dispatch(deleteSong(songId))
  }

}

export const likeSongThunk = (songId) => async (dispatch) => {

  const res = await fetch(`/api/songs/${songId}/like`, {
    method: "POST",
    body: songId
  })

  if (res.ok) {
    const data = await res.json()

    dispatch(getAllSongs())
    return data
  }

}

export const dislikeSongThunk = (songId) => async (dispatch) => {

  const res = await fetch(`/api/songs/${songId}/dislike`, {
    method: "POST",
    body: songId
  })

  if (res.ok) {
    const data = await res.json()

    dispatch(getAllSongs())
    return data
  }

}

// Add a song to an album thunk
export const addToAlbumThunk = (albumId, songId) => async(dispatch) => {
  const response = await fetch(`/api/users/current/songs/${songId}/add/${albumId}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'}
  });
  if (response.ok) {
    // const data = await response.json()
    await response.json()
    // dispatch(addToAlbumAction(albumId, songId))
    dispatch(getCurrentSongs())

  }
}


const initialState = { Songs: {} };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { Songs: { ...newObj } };
    }

    // case LOAD_ONE_SONG: {
    //   const newState = {}
    //   newState[action.song.id] = action.song
    //   return newState
    // }
    case DELETE_SONG: {
      const newState = { ...state }
      delete newState.Songs[action.songId]
      return {...newState};
    }
    case ADD_TO_ALBUM: {
      const { songId, albumId} = action.payload
      const song = state.Songs[songId]
      if(!song) {
        return state;
      }
      const updateSong = {
        ...song,
        album: {...song.album, id: albumId}
      }
      return {
        ...state, Songs: {...state.Songs, [songId]: updateSong}
      }
    }
    default:
      return state;
  }
}




export default songReducer;
