import React from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";
import numeral from "numeral";
import { DateTime } from 'luxon';
import { ThumbUp, ThumbDown } from "@material-ui/icons";

const VideoInfo = ({
  title,
  description,
  timestamps,
  channelTitle,
  channelImage,
  viewCount,
  likeCount,
  dislikeCount,
  subs,
}) => {
  return (
    <div className="videoinfo">
      <div className="videoinfo__headline">
        <h1>{title}</h1>
      </div>
      <div className="videoinfo__stats">
        <p>
          {numeral(viewCount).format("0.a")} vues
          • publication : {timestamps}
        </p>
        <div className="videoinfo__likes">
          <ThumbUp /> {numeral(likeCount).format("0.a")}
          <ThumbDown /> {numeral(dislikeCount).format("0.a")}
        </div>
      </div>
      <hr />
      <div className="videoinfo__channel">
        <div>
          <Avatar
            className="videoinfo__avatar"
            alt={channelTitle}
            src={channelImage}
          />
          <div className="videoinfo__channelinfo">
            <h3 className="videoinfo__channeltitle">{channelTitle}</h3>
            <p className="videoinfo__channelsubs">{numeral(subs).format("0.a")} Abonnements</p>
          </div>
        </div>
        <div className="videoinfo__subscribe">
          <button className="btn btn-danger">S'abonner</button>
        </div>
      </div>
      <br />
      <div className="videoinfo__channeldesc">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoInfo;
