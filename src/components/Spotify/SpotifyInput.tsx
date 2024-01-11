import React, { KeyboardEventHandler, MouseEventHandler } from "react";

interface SpotifyInputProps {
  handleInput: KeyboardEventHandler<HTMLInputElement>;
  handleSubmit: Function;
  isError: boolean;
}

const SpotifyInput: React.FC<SpotifyInputProps> = ({
  handleInput,
  handleSubmit,
  isError,
}) => {
  return (
    <div className="flex flex-col items-center text-center border border-solid border-white rounded m-5 p-3 h-screen h-48 w-1/2">
      <div className="my-2">
        <p className="text-gray-100">Enter a new Spotify playlist name</p>
      </div>
      <div className="my-2">
        <input
          id="newPlaylistName"
          className={`border border-solid  ${
            isError ? "border-2 border-red-700" : "border-black"
          }`}
          onKeyUp={(e) => handleInput(e.target.value)}
        ></input>
      </div>
      <div className="my-2">
        <button
          className="w-200 px-2 py-1 bg-purple-600 text-gray-100"
          onClick={() => handleSubmit(true)}
        >
          Migrate to Spotify
        </button>
        {isError ? (
          <div className="my-2">
            <span className="text-red-700">Please enter a value!</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SpotifyInput;
