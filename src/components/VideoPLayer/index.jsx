import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Video from "../Video";
import RecommendedVideos from "../RecommendedVideos";
import VideoInfo from "../VideoInfo";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import "./style.css";

const VideoPlayer = () => {
  let { videoId } = useParams();

  const [videoInfo, setVideoInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setVideoInfo([]);
    setIsLoading(true);
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=AIzaSyBECTQ9-UglEFWRsemrTyGIsqHUoAqmd8c`
      )
      .then((response) => {
        console.log(response.data);
        createVideoInfo(response.data["items"][0]);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [videoId]);

  async function createVideoInfo(video) {
    const snippet = video.snippet;
    const stats = video.statistics;
    const channelId = snippet.channelId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=AIzaSyBECTQ9-UglEFWRsemrTyGIsqHUoAqmd8c`
    );

    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const publishedDate = new Date(snippet.publishedAt).toLocaleDateString(
      "en-GB",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
    const title = snippet.title;
    const description = snippet.description;
    const channelTitle = snippet.channelTitle;
    const viewCount = stats.viewCount;
    const likeCount = stats.likeCount;
    const dislikeCount = stats.dislikeCount;

    setVideoInfo({
      title,
      description,
      publishedDate,
      channelTitle,
      channelImage,
      viewCount,
      likeCount,
      dislikeCount,
      subs,
    });
    setIsLoading(false);
  }
  if (isError) {
    return (
      <Alert severity="error" className="loading">
        No Results found!
      </Alert>
    );
  }
  return (
    <div className="videoplayer">
      <div className="videoplayer__videodetails">
        <div className="videoplayer__video">
          {isLoading ? (
            <CircularProgress className="loading" color="secondary" />
          ) : (
            <Video videoId={videoId} />
          )}
        </div>
        <div className="videoplayer__videoinfo">
          {!isLoading ? (
            <VideoInfo
              title={videoInfo.snippet}
              description={videoInfo.description}
              publishedDate={videoInfo.publishedDate}
              channelTitle={videoInfo.channelTitle}
              channelImage={videoInfo.channelImage}
              viewCount={videoInfo.viewCount}
              likeCount={videoInfo.likeCount}
              dislikeCount={videoInfo.dislikeCount}
              subs={videoInfo.subs}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
