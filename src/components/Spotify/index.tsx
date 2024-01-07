import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SPOTIFY_CLIENT_ID } from '../../config';
import { isNullOrEmpty } from '../../utils/helpers';
import Spinner from '../Common/Spinner';
import { createSpotifyPlaylist } from '../../services/PlaylistService';

function generateCodeVerifier(length: number): string {
  let text = '';
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function getAccessToken(code: string) {
  const verifier = localStorage.getItem('verifier');

  const params = new URLSearchParams();
  params.append('client_id', SPOTIFY_CLIENT_ID);
  params.append('grant_type', 'authorization_code');
  params.append('code', code);
  params.append('redirect_uri', 'http://localhost:3000/migrate');
  params.append('code_verifier', verifier!);

  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  });

  const { access_token } = await result.json();
  return access_token;
}

async function migratePlaylist(token: string): Promise<any> {
  const createPlaylistBody = {
    "name": "Test Playlist 2",
    "description": "Test playlist description",
    "public": true
}
  const result = await createSpotifyPlaylist(token, 'jkpycj3kij4xy8ua19neexrl6', createPlaylistBody);
  const data = await result.json();
  return data;
}

function populateUI(profile: any) {
  console.log('profile');
  console.log(profile);
  document.getElementById('displayName')!.innerText = profile.display_name;
  if (profile.images[0]) {
    const profileImage = new Image(200, 200);
    profileImage.src = profile.images[0].url;
    document.getElementById('avatar')!.appendChild(profileImage);
  }
  document.getElementById('id')!.innerText = profile.id;
  document.getElementById('email')!.innerText = profile.email;
  document.getElementById('uri')!.innerText = profile.uri;
  document
    .getElementById('uri')!
    .setAttribute('href', profile.external_urls.spotify);
  document.getElementById('url')!.innerText = profile.href;
  document.getElementById('url')!.setAttribute('href', profile.href);
  document.getElementById('imgUrl')!.innerText =
    profile.images[0]?.url ?? '(no profile image)';
}

const Spotify: React.FC = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  async function redirectToAuthCodeFlow() {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem('verifier', verifier);

    const params = new URLSearchParams();
    params.append('client_id', SPOTIFY_CLIENT_ID);
    params.append('response_type', 'code');
    params.append('redirect_uri', 'http://localhost:3000/migrate');
    params.append('scope', 'user-read-private user-read-email playlist-modify-public');
    params.append('code_challenge_method', 'S256');
    params.append('code_challenge', challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }
  const intitialize = async () => {
    if (!code) {
      await redirectToAuthCodeFlow();
    }
  };

  useEffect(() => {
    intitialize();
  }, []);

  useEffect(() => {
    if (!code) return;
    getAccessToken(code).then((accessToken) => {
      migratePlaylist(accessToken).then((data) => {
        window.location.replace('success');
        console.log('data');
        console.log(data);
      });
    });
  }, [code]);

  return isNullOrEmpty(code) ? <Spinner loading={true} /> : (
    <>
      <h1>Display your Spotify profile data</h1>

      <section id="profile">
        <h2>
          Logged in as <span id="displayName"></span>
        </h2>
        <span id="avatar"></span>
        <ul>
          <li>
            User ID: <span id="id"></span>
          </li>
          <li>
            Email: <span id="email"></span>
          </li>
          <li>
            Spotify URI: <a id="uri" href="#"></a>
          </li>
          <li>
            Link: <a id="url" href="#"></a>
          </li>
          <li>
            Profile Image: <span id="imgUrl"></span>
          </li>
        </ul>
      </section>
    </>
  );
};

export default Spotify;
