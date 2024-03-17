const GET_ALL_SONGS = 'song/getAllSongs';

// action
const getAllSongsAction = (songs) => {
  return {
    type: GET_ALL_SONGS,
    payload: songs
  }
}

// Thunk Creators
export const getAllSongs = () => async (dispatch) => {
  const response = await fetch('/api/songs');
  const data = await response.json();
  console.log("data======>", data)

  dispatch(getAllSongsAction(data.songs));
  return data
}

const initialState = { Songs: {} };

const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SONGS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ... el});
      return { ...state, Songs : { ...newObj }};
    }
    default:
      return state;
  }
}

export default songReducer;
