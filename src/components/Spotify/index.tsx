import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_SCOPES,
} from "../../config";
import { generateCodeVerifier, isNullOrEmpty } from "../../utils/helpers";
import Spinner from "../Common/Spinner";
import {
  addItemsToSpotifyPlaylist,
  createSpotifyPlaylist,
  getSpotifyProfile,
  searchItemOnSpotify,
} from "../../services/PlaylistService";

const Spotify: React.FC = () => {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const [loading, setLoading] = useState(false);
  const [successResults, setSuccessResults] = useState([]);
  const [failedResults, setFailedResults] = useState([]);

  async function createPlaylist(token: string, userId: string): Promise<any> {
    const createPlaylistBody = {
      name: state.outputPlaylistName,
      description: `"${state.outputPlaylistName}" playlist created on Spotify from Youtube. Powered by "Playlist To Go"!`,
      public: true,
    };
    const result = await createSpotifyPlaylist(
      token,
      userId,
      createPlaylistBody
    );
    const data = await result.json();
    return data;
  }

  async function getProfile(token: string): Promise<any> {
    const result = await getSpotifyProfile(token);
    const data = await result.json();
    return data;
  }

  function populateUI(data: any) {
    document.getElementById("uri")!.innerText = data.uri;
    document
      .getElementById("uri")!
      .setAttribute("href", data.external_urls.spotify);
  }
  async function startDataMigration() {
    const verifier = generateCodeVerifier(128);
    localStorage.setItem("verifier", verifier);

    const popup = window.open(
      `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=token&redirect_uri=${SPOTIFY_REDIRECT_URI}&scope=${SPOTIFY_SCOPES}&show_dialog=true`,
      "Login with Spotify"
    );
    window.spotifyCallback = async (token: string) => {
      popup.close();
      setLoading(false);
      const profileData = await getProfile(token);
      try {
        const playlistData = await createPlaylist(token, profileData.id);
        populateUI(playlistData);
        const playlistId = playlistData.id;
        const searchSuccessful: Array<string> = [];
        const searchFailed: Array<string> = [];
        const youtubeItems = state.sourcePlaylistData?.items;
        const searchComplete = await youtubeItems.map(
          async (youtubeItem: Object) => {
            const artist = youtubeItem.snippet.videoOwnerChannelTitle.replace(
              " - Topic",
              ""
            );
            const track = youtubeItem.snippet.title;
            const queryString = `track:${track} artist:${artist}`;
            try {
              const searchResponse = await searchItemOnSpotify(
                token,
                queryString
              );
              const searchData = await searchResponse.json();
              const searchedUri = searchData?.tracks?.items[0]?.uri;
              !isNullOrEmpty(searchedUri)
                ? searchSuccessful.push(searchedUri)
                : searchFailed.push(searchedUri);
              return searchedUri;
            } catch (searchErr) {
              console.log("Error fetching / searching data ", searchErr);
            }
          }
        );
        Promise.allSettled(searchComplete).then((results) => {
          setSuccessResults(searchSuccessful);
          setFailedResults(searchFailed);
          const searchResults = results.map((result) => {
            if (result.status === "fulfilled" && !isNullOrEmpty(result.value)) {
              return result.value;
            }
          });
          addItemsToSpotifyPlaylist(token, playlistId, {
            uris: searchResults.filter((res) => res),
            position: 0,
          });
        });
      } catch (playlistErr) {
        console.log("Error creating playlist ", playlistErr);
      }
    };
  }
  const intitialize = async () => {
    const token = window.location.hash.substr(1).split("&")[0].split("=")[1];
    if (token) {
      window.opener.spotifyCallback(token);
    }
    if (!code) {
      setLoading(true);
      await startDataMigration();
    }
  };

  useEffect(() => {
    intitialize();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <>
      <h1>Youtube To Spotify Playlist Migration</h1>
      <h3>Results</h3>

      <section id="profile">
        <h2>
          Spotify Playlist Created: <a id="uri" href="#"></a>
        </h2>
        {successResults.length > 0 && (
          <p>Successfully added {successResults.length} tracks. </p>
        )}
        {failedResults.length > 0 && (
          <p>
            Failed to add {failedResults.length} tracks because either they were
            private or not found on Spotify.{" "}
          </p>
        )}
      </section>
    </>
  );
};

export default Spotify;
