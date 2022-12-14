import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import VideoPlayer from "../VideoPLayer";

const VideoCard = ({ image, channelImage, title, channel, views, timestamp, description }) => {
  return (
    <div className="videocard" onClick={<VideoPlayer />}>
      <img className="videocard__image" src={image} alt="" />
      <div className="videocard__info">
        <Avatar
          className="videocard__avatar"
          alt={channel}
          src={channelImage}
        />
        <div className="videocard__text">
          <h4>{title}</h4>
          <p>{channel} • {views} views • {timestamp}</p>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
