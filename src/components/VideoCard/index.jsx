import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import VideoPlayer from "../VideoPLayer";
import numeral from "numeral";
import { Link } from "react-router-dom";

const VideoCard = ({ image, channelImage, title, channel, views, timestamp, description }) => {
  return (
    <div className="videocard" onClick={<VideoPlayer />}>
      <img className="videocard__image" src={image} alt="" />
      <div className="videocard__info">
        <Link to='ListVideosChannel'>
          <Avatar
            className="videocard__avatar"
            alt={channel}
            src={channelImage}
          />
        </Link>
        <div className="videocard__text">
          <h4>{title}</h4>
          <p>{channel} • {numeral(views).format("0.a")} vues • {timestamp}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
