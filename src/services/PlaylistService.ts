import { getCleanUrl } from "../utils/helpers";
import { API_KEY, YOUTUBE_BASE_PATH, SPOTIFY_BASE_PATH } from "../config";
import getRequest from "./BaseService";

const getYoutubePlaylist = async (
  access_token: string,
  playListId: string
): Promise<Response> => {
  const requestPath = `${YOUTUBE_BASE_PATH}/playlistItems?part=snippet&maxResults=80&playlistId=${playListId}&prettyPrint=true&access_token=${access_token}&key=${API_KEY}`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, "GET");
};

const getSpotifyProfile = async (token: string): Promise<any> => {
  const requestPath = `${SPOTIFY_BASE_PATH}/me`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, "GET", null, token);
};

const searchItemOnSpotify = async (
  token: string,
  queryString: string
): Promise<any> => {
  const requestPath = `${SPOTIFY_BASE_PATH}/search?q=${queryString}&type=track&limit=1`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, "GET", null, token);
};

const createSpotifyPlaylist = async (
  token: string,
  userId: string,
  body: any
): Promise<any> => {
  const requestPath = `${SPOTIFY_BASE_PATH}/users/${userId}/playlists`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, "POST", body, token);
};

const addItemsToSpotifyPlaylist = async (
  token: string,
  playlistId: string,
  body: any
): Promise<any> => {
  const requestPath = `${SPOTIFY_BASE_PATH}/playlists/${playlistId}/tracks`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, "POST", body, token);
};

export {
  getYoutubePlaylist,
  createSpotifyPlaylist,
  getSpotifyProfile,
  searchItemOnSpotify,
  addItemsToSpotifyPlaylist,
};
