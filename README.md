# Playlist To Go

## About the project

Transfer your playlists from YouTube to Spotify effortlessly with just a few clicks!

## How it works

Step 1: Enter playlist ID from Youtube playlist's URL.
![Step 1: Enter playlist ID from Youtube playlist's URL.](1.png) 

Step 2: Redirection to Google Authorization Server, log in to authorize access to Youtube Data APIs in scope.
![Step 2: Redirection to Google Authorization Server, log in to authorize access to Youtube Data APIs in scope.](2.png)

Step 3: Youtube playlist results are rendered. Input Spotify playlist name of your choice.
![Step 3: Youtube playlist results are rendered. Input Spotify playlist name of your choice.](3.png)

Step 4: Redirection to Spotify Authorization Server, log in to authorize access to Spotify Data APIs in scope.
![Step 4: Redirection to Spotify Authorization Server, log in to authorize access to Spotify Data APIs in scope.](4.png) 

Step 5: Spotify playlist is created with success and failure reporting.
![Step 5: Spotify playlist is created with success and failure reporting.](5.png) 

Step 6: Example of successfully migrated tracks denoted by green tick, and failed tracks denoted by red cross.
![Step 6: Example of successfully migrated tracks denoted by green tick, and failed tracks denoted by red cross.](6.png) 

Step 7: Validation of playlist creation on Spotify.
![Step 7: Validation of playlist creation on Spotify.](7.png) 

## Built With

* ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
* ![Snowpack Badge](https://img.shields.io/badge/Snowpack-2E5E82?logo=snowpack&logoColor=fff&style=flat)
* ![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
* ![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=flat)
* ![Prettier Badge](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=fff&style=flat)

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/main/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.mjs` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.
