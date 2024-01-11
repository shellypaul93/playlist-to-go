import React, {
  KeyboardEventHandler,
  LegacyRef,
  MouseEventHandler,
} from "react";

interface YoutubeInputProps {
  inputRef: LegacyRef<HTMLInputElement>;
  handleInput: KeyboardEventHandler<HTMLInputElement>;
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
  isError: boolean;
}

const YoutubeInput: React.FC<YoutubeInputProps> = ({
  inputRef,
  handleInput,
  handleSubmit,
  isError,
}) => {
  return (
    <div className="flex flex-col items-center mx-auto my-5 p-3 border border-solid border-white rounded h-60 w-1/2">
      <div className="my-2">
        <label for="playListId" className="text-gray-100">
          Enter Youtube playlist ID:
        </label>
        <div>
          <input
            type="text"
            name="playListId"
            id="playListId"
            className={`border border-solid ${
              isError ? "border-2 border-red-700" : "border-black"
            }`}
            ref={inputRef}
            onKeyUp={(e) => handleInput(e.target.value)}
          ></input>
        </div>
      </div>
      <button
        className="w-200 px-2 py-1 bg-purple-600 text-gray-100"
        onClick={handleSubmit}
      >
        Get My Playlist!
      </button>
      {isError ? (
        <div className="my-2">
          <span className="text-red-700">Please enter a value!</span>
        </div>
      ) : null}
    </div>
  );
};

export default YoutubeInput;
