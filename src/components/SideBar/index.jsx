import React from "react";
import SideBarRow from "../SideBarRow";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link, NavLink } from "react-router-dom";

import "./style.css";

const SideBar = () => {
  let activeStyle = {
    background: "#D0383C"
  };

  return (
    <div className="sidebar">
      <NavLink to='/home' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <SideBarRow
          Icon={HomeIcon}
          title="Home"
        />
      </NavLink >

      <NavLink to='/Trending'>
        <SideBarRow
          Icon={WhatshotIcon}
          title="Trending" />
      </NavLink>

      <NavLink to='/myChannel' style={({ isActive }) => (isActive ? activeStyle : undefined)}>
        <SideBarRow
          Icon={SubscriptionsIcon}
          title="Subscription"
        />
      </NavLink>

      <hr />
      <NavLink to='/Library'>
        <SideBarRow
          Icon={VideoLibraryIcon}
          title="Library" />
      </NavLink>

      <NavLink to='/History'>
        <SideBarRow
          Icon={HistoryIcon}
          title="History" />
      </NavLink>

      <NavLink to='/YourVideos'>
        <SideBarRow
          Icon={OndemandVideoIcon}
          title="Your videos" />
      </NavLink>

      <hr />
      <NavLink to='/WatchLater'>
        <SideBarRow
          Icon={WatchLaterIcon}
          title="Watch later" />
      </NavLink>

      <NavLink to='/LikedVideos'>
        <SideBarRow
          Icon={ThumbUpIcon}
          title="Liked videos" />
      </NavLink>
      <hr />
    </div>
  );
};

export default SideBar;
