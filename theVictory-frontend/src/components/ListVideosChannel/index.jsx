import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "../VideoCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import "./style.css";

const ListVideosChannel = () => {

  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { channelId } = useParams()

  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=21&key=${import.meta.env.VITE_APP_API_CLIENT}`)
      .then((response) => response.json())
      .then((data) => {
        setVideoCards(data.items)
        setIsLoading(false)
        console.log(data.items);
      })
      .catch(() => setIsError(true));
  }, []);

  if (isError) {
    return (
      <Alert severity="error" className="alert alert-danger">
        Recherche non trouvée
      </Alert>
    );
  }
  return (
    <div className="recommendedvideos">
      <div class="alert alert-primary" role="alert">

        <p className="title-section">Nom de la chaine</p>

      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress className="spinner text-info " role="status" />
        </div>
      ) : null}
      <div className="recommendedvideos__videos">
        {videoCards.map((video, index) => {
          return (
            <Link key={index} to={`/video/${video.id.videoId}`}>
              <VideoCard
                title={video.snippet.title}
                channel={video.snippet.channelTitle}
                image={video.snippet.thumbnails.medium.url}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListVideosChannel;