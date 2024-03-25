const GET_ALL_ALBUMS = 'album/getAllAlbums';
const GET_SINGLE_ALBUM = 'album/getSingleAlbum';
const DELETE_ALBUM = 'album/deleteAlbum';
const REMOVE_ALBUM_SONG = 'album/removeAlbumSong';
// const ADD_TO_ALBUM = 'album/addToAlbum';


// action
const getAllAlbumsAction = (albums) => {
  return {
    type: GET_ALL_ALBUMS,
    payload: albums
  }
}

const getSingleAlbumAction = (album) => ({
  type: GET_SINGLE_ALBUM,
  album
})


const deleteAlbumAction = (albumId) => ({
  type: DELETE_ALBUM,
  albumId
})

const removeAlbumSongAction = (albumId, songId) => ({
  type: REMOVE_ALBUM_SONG,
  payload: {
    albumId,
    songId
  }
})

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
export const getAllAlbums = () => async (dispatch) => {
  const response = await fetch('/api/albums');
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getAllAlbumsAction(data.albums));
  return data
}

// get single album detail thunk
export const getSingleAlbum = (albumId) => async (dispatch) => {
  // console.log("hit thunk ==========")
  try {
    const response = await fetch(`/api/albums/${albumId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const album = await response.json();
    // console.log("album in thunk=======", album)
    dispatch(getSingleAlbumAction(album));

    return album
  } catch (e) {
    console.log(e)
  }
}

// get all albums belongs to current user thunk
export const getCurrentAlbums = () => async (dispatch) => {
  // console.log("current user's albums in thunk =======")
  const response = await fetch('/api/users/current/albums', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(getAllAlbumsAction(data.albums))
    return data;
  }
  return response;
}

// delete an album thunk
export const deleteAlbum = (albumId) => async (dispatch) => {
  const response = await fetch(`/api/users/current/albums/${albumId}/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    dispatch(deleteAlbumAction(albumId))
  }
}

// remove a song from an album thunk
export const removeAlbumSong = (albumId, songId) => async (dispatch) => {
  const response = await fetch(`/api/users/current/albums/${albumId}/remove/${songId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    dispatch(removeAlbumSongAction(albumId, songId))
  }
}


// // Add a song to an album thunk
// export const addToAlbumThunk = (albumId, songId) => async(dispatch) => {
//   const response = await fetch(`/api/users/current/songs/${songId}/add/${albumId}`, {
//     method: 'PUT',
//     headers: {'Content-Type': 'application/json'}
//   });
//   if (response.ok) {
//     dispatch(addToAlbumAction(albumId, songId))
//   }
// }

const initialState = { Albums: {} };

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Albums: { ...newObj } };
    }
    case GET_SINGLE_ALBUM: {
      return { ...state, Albums: { ...state.Albums, [action.album.id]: action.album } }
    }
    case DELETE_ALBUM: {
      const newState = { ...state };
      delete newState.Albums[action.albumId];
      return newState
    }
    case REMOVE_ALBUM_SONG: {
      const album = state.Albums[action.payload.albumId];
      const updatedSongArray = album.songs.filter(song => song.id !== action.payload.songId);
      const updatedAlbum = { ...album, songs: updatedSongArray }
      return {
        ...state, Albums: { ...state.Albums, [action.payload.albumId]: updatedAlbum }
      }
    }
    // case ADD_TO_ALBUM: {
    //   const album = state.Albums[action.payload.albumId];
    //   if (!album.songs.includes(action.payload.songId)) {
    //     const updatedSongArray = [...album.songs, ]
    //   }
    // }
    default:
      return state;
  }
}

export default albumReducer;
