import React from "react";
import SideBarRow from "../SideBarRow";
import "./style.css";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { Link, NavLink } from "react-router-dom";

const SideBar = () => {

  let activeStyle = { background: "#D0383C" };

  return (
    <div className="sidebar">

      <NavLink to='/home'>
        <SideBarRow
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          Icon={HomeIcon}
          title="Home"
        />
      </NavLink >

      <NavLink to='/Trending'>
        <SideBarRow Icon={WhatshotIcon} title="Trending" />
      </NavLink>


      <NavLink to='/myChannel'>
        <SideBarRow
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          Icon={SubscriptionsIcon}
          title="Subscription"
        />
      </NavLink>

      <hr />
      <SideBarRow Icon={VideoLibraryIcon} title="Library" />
      <SideBarRow Icon={HistoryIcon} title="History" />
      <SideBarRow Icon={OndemandVideoIcon} title="Your videos" />
      <SideBarRow Icon={WatchLaterIcon} title="Watch later" />

      <NavLink>
        <SideBarRow Icon={ThumbUpIcon} title="Liked videos" />
      </NavLink>
      <hr />
    </div>
  );
};

export default SideBar;
