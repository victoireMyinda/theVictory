import React from "react";
import YouTube from "react-youtube";

const Video = ({ videoId }) => {
  return (
    <div>
      <YouTube width={750} videoId={videoId} />
    </div>
  );
};

export default Video;
