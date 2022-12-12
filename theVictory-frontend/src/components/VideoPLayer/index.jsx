import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Video from "../Video";
import VideoInfo from "../VideoInfo";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import { Avatar } from "@mui/material";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { DateTime } from 'luxon';
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
    console.log(response)
    const channelImage = response.data.items[0].snippet.thumbnails.medium.url;
    const subs = response.data.items[0].statistics.subscriberCount;
    const timestamps = DateTime.fromISO(snippet.publishedAt).toRelative();
    const title = snippet.title;
    const description = snippet.description;
    const channelTitle = snippet.channelTitle;
    const viewCount = stats.viewCount;
    const likeCount = stats.likeCount;
    const dislikeCount = stats.dislikeCount;

    setVideoInfo({
      title,
      description,
      timestamps,
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

  const [id, setId] = useState("");
  const [description, setDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [commentIsAdd, setCommentIsAdd] = useState(null);

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const addComment = (e) => {
    setCommentIsAdd(1)
    e.preventDefault()
    axios.post('http://localhost:9000/api/posts', { videoID: videoId })
      .then(resp => {

        const valueId = resp.data
        axios.patch('http://localhost:9000/api/posts/comment-post/' + `${resp.data}`, {
          description: description,
          commentaireID: ""
        })
          .then(resp => {
            setDescription("")
            getAllPosts()
            console.log(resp)
            //document.getElementById('comment').value = ""
          })
          .catch(err => {
            console.log(err)
            setCommentIsAdd(false)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getAllPosts = () => {
    axios.get("http://localhost:9000/api/posts")
      .then(resp => {
        setPosts(resp.data)
        console.log(resp.data);
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllPosts();
  }, [])

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
              title={videoInfo.title}
              description={videoInfo.description}
              timestamps={videoInfo.timestamps}
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
        </div>
        <hr />


        <div>
          <form>
            <div class="form-group">
              <label for="comment">Ajouter un commentaire</label>
              <textarea class="form-control" id="comment" rows="2" value={description}
                onChange={onChangeDescription}></textarea>
            </div>

            <div className="btns d-flex">
              <button className="btn btn-danger" >Annuler</button>
              <button className="btn btn-info text-white" onClick={addComment}>Envoyer</button>
            </div>
          </form>
        </div>

        <hr />


        <div>
          {
            posts && posts.map(value => {
              if (value.videoID === videoId) {
                return (

                  <>
                    <div className="">

                      {value.commentaires && value.commentaires.map(val => {
                        return (
                          <div className="userComment mb-3">
                            <div className="AvatarAndUserName d-flex">
                              <div className="img">  <Avatar /> </div>
                              <div className="userName">
                                <span>Victoire myinda.</span>
                                <span>
                                  {
                                    DateTime.fromISO(value.createdAt).toRelative()
                                  }
                                </span>
                              </div>
                            </div>
                            {val.description}
                            <div className="likeDislikeResponse d-flex">
                              <div className="like"><ThumbUp /> 80</div>
                              <div className="dislike"><ThumbDown /> 0</div>
                              <div className="response"> <button className="btn btn-info text-white">Repondre</button></div>

                              <div className="subComment"></div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                  </>
                )
              }
            })
          }

        </div>


      </div>
    </div>
  );
};

export default VideoPlayer;
