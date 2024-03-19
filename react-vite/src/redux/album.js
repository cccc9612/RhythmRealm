const GET_ALL_ALBUMS = 'album/getAllAlbums';

// action
const getAllAlbumsAction = (albums) => {
  return {
    type: GET_ALL_ALBUMS,
    payload: albums
  }
}

// Thunk Creators
export const getAllAlbums = () => async (dispatch) => {
  const response = await fetch('/api/albums');
  const data = await response.json();
  // console.log("data======>", data)

  dispatch(getAllAlbumsAction(data.albums));
  return data
}

const initialState = { Albums: {} };

const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ALBUMS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ... el});
      return { ...state, Albums : { ...newObj }};
    }
    default:
      return state;
  }
}

export default albumReducer;
