const GET_ALL_ALBUMS = 'album/getAllAlbums';
const GET_SINGLE_ALBUM = 'album/getSingleAlbum'

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


// Thunk Creators
export const getAllAlbums = () => async (dispatch) => {
  const response = await fetch('/api/albums');
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getAllAlbumsAction(data.albums));
  return data
}

// get single album detail thunk
export const getSingleAlbum = (albumId) => async(dispatch) => {
  console.log("hit thunk ==========")
  try {
    const response = await fetch(`/api/albums/${albumId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    const album = await response.json();
    console.log("album in thunk=======", album)
    dispatch(getSingleAlbumAction(album));
  
    return album
  } catch (e) {
    console.log(e)
  }
}



const initialState = { Albums: {} };

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ... el});
      return { ...state, Albums : { ...newObj }};
    }
    case GET_SINGLE_ALBUM: {
      return {...state, Albums : {...state.Albums, [action.album.id]: action.album}}
    }
    default:
      return state;
  }
}

export default albumReducer;
