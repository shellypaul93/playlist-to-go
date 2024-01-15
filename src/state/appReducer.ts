import { SET_PLAYLIST_ID, SET_PLAYLIST_RESULTS, SET_OUTPUT_PLAYLIST_NAME, SET_INPUT_FORM_ERROR, SET_OUPUT_FORM_ERROR, SET_FAILED_MIGRATION_ITEMS } from '../constants';

const appInitialState = {
  userState: {
    loggedIn: false,
    firstName: '',
    lastname: '',
    profilePicture: '',
  },
  inputPlaylistId: '',
  inputFormError: false,
  outputFormError: false,
  outputPlaylistName: '',
  playlistResults: {},
  failedMigrationItems: [],
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
    case SET_OUTPUT_PLAYLIST_NAME:
      return {
        ...state,
        outputPlaylistName: action.payload,
      };
    case SET_INPUT_FORM_ERROR:
      return {
        ...state,
        inputFormError: action.payload,
      };
    case SET_OUPUT_FORM_ERROR:
      return {
        ...state,
        outputFormError: action.payload,
      };
    case SET_FAILED_MIGRATION_ITEMS:
      return {
        ...state,
        failedMigrationItems: action.payload,
      };
    default:
      break;
  }
}

export default appReducer;
export { appInitialState };
