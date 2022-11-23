import React from "react";
import "./style.css";
import VideoPlayer from "../VideoPLayer";
import Avatar from "@material-ui/core/Avatar";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";


const VideoRow = ({ image, title, channelImage, channel, views, timestamp, description }) => {
  return (
    <div className="videorow" onClick={<VideoPlayer />}>
      <img src={image} alt="image channel" />
      <div className="videorow__text">
        <h6>{title}</h6>
        <p className="videorow__headline">
          {numeral(views).format("0.a")}
          vues • {timestamp}
        </p>
        <p className="videorow__description">{description}</p>
        <p className="avatarChannel"><Avatar
          className="videocard__avatar"
          alt={channel}
          src={channelImage}
        />
          {channel}
        </p>
      </div>
    </div>
  );
};

export default VideoRow;
