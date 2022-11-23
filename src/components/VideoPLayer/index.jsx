import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Video from "../Video";
import VideoInfo from "../VideoInfo";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Avatar } from "@mui/material";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
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
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics&id=${videoId}&key=${import.meta.env.VITE_APP_API_CLIENT}`
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
      `https://www.googleapis.com/youtube/v3/channels?part=snippet%2C%20statistics&id=${channelId}&key=${import.meta.env.VITE_APP_API_CLIENT}`
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

        <div className="container-fluid commentaire">
          <div className="titleComment">
            <h4 className="text-secondary">commentaires(500)</h4>
          </div>
          <hr />

          <div>
            <form>
              <div class="form-group">
                <label for="comment">Ajouter un commentaire</label>
                <textarea class="form-control" id="comment" rows="2"></textarea>
              </div>
            </form>
            <div className="btns d-flex">
              <button className="btn btn-danger" >Annuler</button>
              <button className="btn btn-info text-white" type="submit">Envoyer</button>
            </div>

            <hr />

            <div className="userComment ">
              <div className="AvatarAndUserName d-flex">
                <div className="img">  <Avatar /> </div>
                <div className="userName">
                  <span>Victoire myinda.</span>
                  <span>Il y'a 4 heures</span>
                </div>
              </div>

              <div className="responseComment">
                <p>
                  Quand ma fille était étudiante en pharmacie, elle a vu une pharmacie et elle voulait cette pharmacie ! Je lui
                  ai conseillé de se visualiser dans la pharmacie, de ressentir  ce qu'elle ferait, de le vivre comme si la pharmacie
                  lui appartenait, les modifications  qu'elle pourrait faire, etc.  Elle m'a écoutée. À la fin de ses études elle a fait son stage..
                </p>

                <div className="likeDislikeResponse d-flex">
                  <div className="like"><ThumbUp /> 80</div>
                  <div className="dislike"><ThumbDown /> 0</div>
                  <div className="response"> <button className="btn btn-info text-white">Repondre</button></div>

                  <div className="subComment"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
