const LOAD_SONGS = 'playlist/loadPlaylist';
const SET_PLAY_INDEX = 'playlist/setPlayIndex'

// action
export const loadPlaylistAction = (songs) => {
  return {
    type: LOAD_SONGS,
    payload: songs
  }
}

export const setPlayIndexAction = (index) => {
  return {
    type: SET_PLAY_INDEX,
    payload: index
  }
}

// No Thunk Creators

const initialState = { Songs: {}, index: 0};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS: {
      const newObj = {};
      action.payload.forEach(el => newObj[el.id] = { ...el });
      return { ...state, Songs: { ...newObj } };
    }
    case SET_PLAY_INDEX: {
      return {...state, index: action.playload};
    }
    default:
      return state;
  }
}

export default playlistReducer;
