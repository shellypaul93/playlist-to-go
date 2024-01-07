import { getCleanUrl } from '../utils/helpers';
import { API_KEY, YOUTUBE_BASE_PATH, SPOTIFY_BASE_PATH } from '../config';
import getRequest from './BaseService';

const getYoutubePlaylist = async (
  access_token: string,
  playListId: string,
): Promise<Response> => {
  const requestPath = `${YOUTUBE_BASE_PATH}/playlistItems?part=snippet&maxResults=80&playlistId=${playListId}&prettyPrint=true&access_token=${access_token}&key=${API_KEY}`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, 'GET');
};

const createSpotifyPlaylist = async (
  token: string,
  userId: string,
  body: any,
): Promise<any> => {
  const requestPath = `${SPOTIFY_BASE_PATH}/users/${userId}/playlists`;
  const cleanUrl = getCleanUrl(requestPath);
  return await getRequest(cleanUrl, 'POST', body, token);
};
export { getYoutubePlaylist, createSpotifyPlaylist };
