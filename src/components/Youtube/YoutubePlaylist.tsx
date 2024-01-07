import React from 'react';

interface PageProps {
  YTplayListData: Object;
}

const YoutubePlaylist: React.FC<PageProps> = ({ YTplayListData }) => {
  return YTplayListData?.items?.length > 0 ? (
    <table>
      {YTplayListData.items.map((item: Object) => {
        const thumbnailUrl = item.snippet?.thumbnails?.default?.url;
        const { title } = item.snippet;
        const artist = item.snippet.videoOwnerChannelTitle?.replace(
          ' - Topic',
          '',
        );
        return (
          <tr>
            <td>
              <img src={thumbnailUrl} width={100} height={100} />
            </td>
            <td>{title}</td>
            <td>{artist}</td>
          </tr>
        );
      })}
    </table>
  ) : null;
};

export default YoutubePlaylist;
