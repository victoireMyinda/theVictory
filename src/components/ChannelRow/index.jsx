import React from "react";
import Avatar from "@material-ui/core/Avatar";

import "./style.css";

const ChannelRow = ({ image, channel, subs, noOfVideos, description }) => {
  return (
    <div className="channelrow">
      <Avatar className="channelrow__logo" alt={channel} src={image} />
      <div className="channelrow__text">
        <h4>{channel}</h4>
        <p>
          {subs} subscribers • {noOfVideos} videos
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ChannelRow;
