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
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">


      <Link to='/home'>
        <SideBarRow Icon={HomeIcon} title="Home" />
      </Link>

      <SideBarRow Icon={WhatshotIcon} title="Trending" />

      <Link to='/userAuth'>
        <SideBarRow Icon={SubscriptionsIcon} title="Subscription" />
      </Link>

      <hr />
      <SideBarRow Icon={VideoLibraryIcon} title="Library" />
      <SideBarRow Icon={HistoryIcon} title="History" />
      <SideBarRow Icon={OndemandVideoIcon} title="Your videos" />
      <SideBarRow Icon={WatchLaterIcon} title="Watch later" />
      <SideBarRow Icon={ThumbUpIcon} title="Liked videos" />
      <hr />
    </div>
  );
};

export default SideBar;
