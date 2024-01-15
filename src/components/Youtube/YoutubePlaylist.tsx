import React from "react";
import CompleteLogo from '../Complete.svg';
import FailedLogo from '../Failed.svg';

interface PageProps {
  YTplayListData: Object;
  failedMigrationItems: Array<Object>;
}

const YoutubePlaylist: React.FC<PageProps> = ({
  YTplayListData,
  failedMigrationItems,
}) => {
  const hasFailedMigration = (item: Object) => {
    let result = false;
    failedMigrationItems.forEach((failedItem) => {
      if (JSON.stringify(item) === JSON.stringify(failedItem)) {
        console.log('item.snippet.title');
        console.log(item.snippet.title);
        result = true;
      }
    });
    return result;
  }

  return YTplayListData?.items?.length > 0 ? (
    <div className="border border-solid border-white rounded m-5 p-3 h-screen w-1/2 overflow-scroll">
      <div>
        <h1 className="text-gray-100 my-5">
          {YTplayListData.pageInfo.totalResults} results found:
        </h1>
        <div className="hidden md:grid md:grid-cols-4 items-center border border-solid border-white rounded p-2 bg-gray-600">
          <div className="w-24">
            <p className="text-gray-100">Thumbnail</p>
          </div>
          <div className="mx-3">
            <p className="text-gray-100">Title</p>
          </div>
          <div className="mx-3">
            <p className="text-gray-100">Artist</p>
          </div>
          {failedMigrationItems?.length > 0 ? (
            <div className="w-16 mx-3">
              <p className="text-gray-100">Status</p>
            </div>
          ) : null}
        </div>
        {YTplayListData.items.map((item: Object) => {
          const thumbnailUrl = item.snippet?.thumbnails?.default?.url;
          const { title } = item.snippet;
          const artist = item.snippet.videoOwnerChannelTitle?.replace(
            " - Topic",
            ""
          );
          return (
            <div className="flex flex-col md:grid md:grid-cols-4 items-center border border-solid border-white rounded p-2">
              <div className="w-24">
                <img src={thumbnailUrl} width={100} height={100} />
              </div>
              <div className="mx-3">
                <p className="text-gray-100">{title}</p>
              </div>
              <div className="mx-3">
                <p className="text-gray-100">{artist}</p>
              </div>
              {failedMigrationItems?.length > 0 ? (
                <div className="mx-3">
                  <p className="text-gray-100">{hasFailedMigration(item) ? 
                  <img
                  className="w-10 h-10 px-1"
                  src={FailedLogo}
                  alt="Youtube to Spotify migration failed"
                /> : <img
                className="w-10 h-10 px-1"
                src={CompleteLogo}
                alt="Youtube to Spotify migration completed"
              />}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default YoutubePlaylist;
