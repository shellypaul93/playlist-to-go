import { SET_PLAYLIST_ID, SET_PLAYLIST_RESULTS } from '../constants';

const appInitialState = {
  userState: {
    loggedIn: false,
    firstName: '',
    lastname: '',
    profilePicture: '',
  },
  inputPlaylistId: '',
  playlistResults: {},
};

function appReducer(
  state = appInitialState,
  action = { type: '', payload: undefined },
) {
  switch (action?.type) {
    case SET_PLAYLIST_ID:
      return {
        ...state,
        inputPlaylistId: action.payload,
      };
    case SET_PLAYLIST_RESULTS:
      return {
        ...state,
        playlistResults: action.payload,
      };
    default:
      break;
  }
}

export default appReducer;
export { appInitialState };
