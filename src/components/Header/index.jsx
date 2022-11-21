import React, { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchPage from "../SearchPage";
import { gapi, loadAuth2 } from "gapi-script";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";



const Header = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";
  const userConnected = window.localStorage.getItem("profilUser");

  const signOut = () => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clientId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        auth2.signOut();
      }
    };

    setAuth2().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="header container-fluid navbar navbar-expand-lg ">
      <div className="header__left">
        <MenuIcon />
        <Link to="/" className="text-decoration-none">
          <span className="header__logo">TheVictory</span>
        </Link>
      </div>

      <div className="input-group d-flex justify-content-center ">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="Recherche"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
          />
        </div>
        <Link to={`/search/${inputSearch}`}>

          <button
            id="search-button"
            type="button"
            class="btn btn-primary"
            onClick={<SearchPage />}
          >
            <i className="fas fa-search header__searchbutton"></i>
          </button>

        </Link>
      </div>

      <div className="header__right">
        <NotificationsIcon alt="notification" src={NotificationsIcon} className="notif" />
        <Avatar alt="Nouman Ahmed" src={userConnected} onClick={() => { alert("hello") }} />

        <button className="btn btn-danger" onClick={signOut}>
          Deconnexion
        </button>
      </div>
    </div>
  );
};

export default Header;
