const LOAD_SONGS = 'playlist/loadPlaylist';
const SET_PLAY_INDEX = 'playlist/setPlayIndex'
const SET_SLICE_INDEX = 'playlist/setSliceIndex'

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

export const setScliceIndexAction = (index) => {
  return {
    type: SET_SLICE_INDEX,
    payload: index
  }
}

// No Thunk Creators

const initialState = { Songs: [], playIndex: 0, sliceIndex: 0};

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS: {
      let songs = [];
      action.payload.forEach(el => songs.push(el) );
      return { ...state, Songs: songs};
    }
    case SET_PLAY_INDEX: {
      return {...state, playIndex: action.payload};
    }
    case SET_SLICE_INDEX: {
      return {...state, sliceIndex: action.payload};
    }
    default:
      return state;
  }
}

export default playlistReducer;
