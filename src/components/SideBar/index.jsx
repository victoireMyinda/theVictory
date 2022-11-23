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
  return (
    <div className="sidebar">
      <NavLink to='/home'>
        <SideBarRow
          Icon={HomeIcon}
          title="Accueil"
        />
      </NavLink >
      <hr />

      <NavLink to='/myChannel'>
        <SideBarRow
          Icon={SubscriptionsIcon}
          title="Mes abonnements"
        />
      </NavLink>
      <hr />
      <NavLink to='/LikedVideos'>
        <SideBarRow
          Icon={ThumbUpIcon}
          title="Videos likées" />
      </NavLink>

      <hr />
      <NavLink to='/watchlater'>
        <SideBarRow
          Icon={WatchLaterIcon}
          title="Regarder plus tard" />
      </NavLink>
      <hr />
    </div>
  );
};

export default SideBar;
