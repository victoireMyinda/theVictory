import React, { useState, useEffect } from "react";
import TuneIcon from "@material-ui/icons/Tune";
import VideoRow from "../CardSearchPage";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const SearchPage = (props) => {
  let { searchQuery } = useParams();

  const [channelRow, setChannelRow] = useState("");
  const [videoRows, setVideoRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setChannelRow("");
    setVideoRows([]);

    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&q=${searchQuery}&safeSearch=none&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
      )
      .then((response) => {
        createVideoRows(response.data["items"]);
        setIsError(false);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchQuery]);

  async function createVideoRows(videos) {
    let newVideoRows = [];
    for (const video of videos) {
      const videoId = video.id.videoId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics%2C%20snippet&id=${videoId}&key=${import.meta.env.VITE_APP_YOUTUBE_API_KEY}`
      );
      const views = response.data.items[0].statistics.viewCount;
      const snippet = video.snippet;
      const title = snippet.title;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;
      const description = snippet.description;
      const image = snippet.thumbnails.medium.url;

      newVideoRows.push({
        videoId,
        title,
        image,
        views,
        timestamp,
        channel,
        description,
      });
    }
    setVideoRows(newVideoRows);
    setIsLoading(false);
  }
  if (isError) {
    return (
      <Alert severity="error" className="alert alert-danger" role="alert">
        Recherche non trouvée
      </Alert>
    );
  }
  return (
    <div className="searchpage">
      <div className="searchpage__filter">
        <TuneIcon />
        <h2>Resultat de la recherche pour : </h2>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress className="spinner text-info " role="status" />
        </div>
      ) : null}
      <hr />

      {videoRows.map((item) => {
        return (
          <Link key={item.videoId} to={`/video/${item.videoId}`}>
            <VideoRow
              title={item.title}
              image={item.image}
              views={item.views}
              timestamp={item.timestamp}
              channel={item.channel}
              description={item.description}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default SearchPage;
