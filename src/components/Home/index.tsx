import React, { useEffect, useRef, useState } from "react";
import YoutubePlaylist from "../Youtube/YoutubePlaylist";
import { isNullOrEmpty } from "../../utils/helpers";
import { getYoutubePlaylist } from "../../services/PlaylistService";
import appReducer, { appInitialState } from "../../state/appReducer";
import {
  SET_OUTPUT_PLAYLIST_NAME,
  SET_PLAYLIST_ID,
  SET_PLAYLIST_RESULTS,
} from "../../constants";
import { YOUTUBE_CLIENT_ID, YOUTUBE_SCOPES } from "../../config";
import Spotify from "../Spotify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Common/Spinner";

const Home: React.FC = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [state, dispatch] = React.useReducer(appReducer, appInitialState);
  const [userState, setUserState] = useState({
    loggedIn: false,
    firstName: "",
    lastname: "",
    profilePicture: "",
  });
  const [loading, setLoading] = useState(false);
  const [tokenClient, setTokenClient] = useState(undefined);
  const playListId = state.inputPlaylistId;
  const newPlaylistName = state.outputPlaylistName;

  const handleCallbackResponse = (response: any) => {
    setUserState({
      loggedIn: true,
      firstName: "",
      lastname: "",
      profilePicture: "",
    });
    const signInDiv = document.getElementById("signInDiv");
    if (isNullOrEmpty(signInDiv)) return;
    signInDiv.style.display = "none";
  };

  useEffect(() => {
    /* global google */
    const google = window.google;
    google.accounts.id.initialize({
      client_id: YOUTUBE_CLIENT_ID,
      context: "signin",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    setTokenClient(
      google.accounts.oauth2.initTokenClient({
        client_id: YOUTUBE_CLIENT_ID,
        scope: YOUTUBE_SCOPES,
        callback: async (tokenResponse: Object) => {
          if (isNullOrEmpty(tokenResponse?.access_token)) return;
          await getPlayListData(tokenResponse.access_token);
        },
      })
    );
  }, [state.inputPlaylistId]);

  const getPlayListData = async (access_token: string) => {
    const response = await getYoutubePlaylist(access_token, playListId);
    const data = await response.json();
    setLoading(false);
    dispatch({
      type: SET_PLAYLIST_RESULTS,
      payload: data,
    });
  };
  const handleSubmit = () => {
    const inputBox = document.getElementById("playListId");
    if (isNullOrEmpty(playListId)) {
      inputRef.current.focus();
      inputBox.style.borderColor = "red";
      return;
    }
    setLoading(true);
    inputBox.style.borderColor = "silver";
    tokenClient.requestAccessToken();
  };

  const handleInputKeyUp = (value: string) => {
    dispatch({
      type: SET_PLAYLIST_ID,
      payload: value,
    });
    const inputBox = document.getElementById("playListId");
    inputBox.style.borderColor = "silver";
  };

  const handleMigrationSubmit = () => {
    navigate("/migrate", {
      state: {
        sourcePlaylistData: state.playlistResults,
        outputPlaylistName: newPlaylistName,
      },
    });
  };

  const handleMigrationInputKeyUp = (value: string) => {
    dispatch({
      type: SET_OUTPUT_PLAYLIST_NAME,
      payload: value,
    });
  };

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <main>
      {userState?.loggedIn ? (
        <h1>Welcome {userState.firstName}</h1>
      ) : (
        <div id="signInDiv" />
      )}
      <br />
      <input
        id="playListId"
        ref={inputRef}
        onKeyUp={(e) => handleInputKeyUp(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Get My Playlist!</button>
      <YoutubePlaylist YTplayListData={state.playlistResults} />
      <br />
      <br />
      {isNullOrEmpty(state.playlistResults) ? null : (
        <div>
          <p>Enter a new Spotify playlist name</p>
          <input
            id="newPlaylistName"
            onKeyUp={(e) => handleMigrationInputKeyUp(e.target.value)}
          ></input>
          <button onClick={handleMigrationSubmit}>Migrate to Spotify</button>
        </div>
      )}
    </main>
  );
};

export default Home;
