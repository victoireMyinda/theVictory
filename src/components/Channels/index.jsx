import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../VideoCard";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";


import "./style.css";

const Channels = () => {
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";

  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const user = localStorage.getItem("token");


  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=50&mine=true&key=${import.meta.env.VITE_APP_API_CLIENT}`,
      {
        method: "GET",
        headers: new Headers({ Authorization: `Bearer ${user}` }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.items);
        createVideoCards(data.items);
      })
      .catch(() => setIsError(true));
  }, []);

  async function createVideoCards(videoItems) {
    let newVideoCards = [];
    for (const video of videoItems) {
      const videoId = video.id;
      const snippet = video.snippet;
      const channelId = snippet.resourceId.channelId;
      const channelid = window.localStorage.setItem('channel', channelId)
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&maxResults=9&key=${import.meta.env.VITE_APP_API_CLIENT}`
      );
      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;

      newVideoCards.push({
        channelId,
        videoId,
        image,
        title,
        channel,
        timestamp,
        channelImage,
      });
    }
    setVideoCards(newVideoCards);
    setIsLoading(false);
  }

  if (isError) {
    return (
      <Alert severity="error" className="alert alert-danger">
        Recherche non trouvée
      </Alert>
    );
  }
  return (
    <div className="recommendedvideos container-fluid">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress className="spinner text-info " role="status" />
        </div>
      ) : null}
      <div className="recommendedvideos__videos">
        {videoCards.map((item) => {
          return (
            <Link
              key={item.videoId}
              to={`/listVideosChannel/${item.channelId}`}
            >
              <VideoCard
                title={item.title}
                image={item.image}
                timestamp={item.timestamp}
                channel={item.channel}
                channelImage={item.channelImage}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Channels;
