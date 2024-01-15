import React, { useEffect, useState } from "react";
import YoutubePlaylist from "../Youtube/YoutubePlaylist";
import { isNullOrEmpty } from "../../utils/helpers";
import { getYoutubePlaylist } from "../../services/PlaylistService";
import appReducer, { appInitialState } from "../../state/appReducer";
import {
  SET_FAILED_MIGRATION_ITEMS,
  SET_INPUT_FORM_ERROR,
  SET_OUPUT_FORM_ERROR,
  SET_OUTPUT_PLAYLIST_NAME,
  SET_PLAYLIST_ID,
  SET_PLAYLIST_RESULTS,
} from "../../constants";
import { YOUTUBE_CLIENT_ID, YOUTUBE_SCOPES } from "../../config";
import Spinner from "../Common/Spinner";
import Header from "../Common/Header";
import Spotify from "../Spotify";
import YoutubeInput from "../Youtube/YoutubeInput";
import SpotifyInput from "../Spotify/SpotifyInput";

const Home: React.FC = () => {
  const [state, dispatch] = React.useReducer(appReducer, appInitialState);
  const [loading, setLoading] = useState(false);
  const [showSpotify, setShowSpotify] = useState(false);
  const [tokenClient, setTokenClient] = useState(undefined);
  const playListId = state.inputPlaylistId;
  const newPlaylistName = state.outputPlaylistName;

  const handleCallbackResponse = (response: any) => {
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
  const handleYoutubeSubmit = () => {
    if (isNullOrEmpty(playListId)) {
      dispatch({
        type: SET_INPUT_FORM_ERROR,
        payload: true,
      });
      return;
    }
    setLoading(true);
    dispatch({
      type: SET_INPUT_FORM_ERROR,
      payload: false,
    });
    tokenClient.requestAccessToken();
  };

  const handleYoutubeInput = (value: string) => {
    dispatch({
      type: SET_PLAYLIST_ID,
      payload: value,
    });
    dispatch({
      type: SET_INPUT_FORM_ERROR,
      payload: false,
    });
  };

  const handleMigrationSubmit = () => {
    if (isNullOrEmpty(newPlaylistName)) {
      dispatch({
        type: SET_OUPUT_FORM_ERROR,
        payload: true,
      });
      return;
    }
    dispatch({
      type: SET_OUPUT_FORM_ERROR,
      payload: false,
    });
    setShowSpotify(true);
  };

  const handleMigrationInputKeyUp = (value: string) => {
    dispatch({
      type: SET_OUTPUT_PLAYLIST_NAME,
      payload: value,
    });
    dispatch({
      type: SET_OUPUT_FORM_ERROR,
      payload: false,
    });
  };

  const setFailedMigrationItems = (failedItems: Array<Object>) => {
    dispatch({
      type: SET_FAILED_MIGRATION_ITEMS,
      payload: failedItems,
    });
  };

  return (
    <>
      <Header />
      <main className="h-full w-full my-o mx-2">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="flex flex-col-reverse md:flex-row items-center">
            {isNullOrEmpty(state.playlistResults) ? (
              <YoutubeInput
                handleInput={handleYoutubeInput}
                handleSubmit={handleYoutubeSubmit}
                isError={state.inputFormError}
              />
            ) : (
              <>
                <YoutubePlaylist 
                YTplayListData={state.playlistResults}
                failedMigrationItems={state.failedMigrationItems}
                />
                {showSpotify ? (
                  <Spotify
                    sourcePlaylistData={state.playlistResults}
                    outputPlaylistName={newPlaylistName}
                    setFailedMigrationItems={setFailedMigrationItems}
                  />
                ) : (
                  <SpotifyInput
                    handleInput={handleMigrationInputKeyUp}
                    handleSubmit={handleMigrationSubmit}
                    isError={state.outputFormError}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
