import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Channels from "./components/Channels";
import SearchPage from "./components/SearchPage";
import ListVideosChannel from "./components/ListVideosChannel";
import VideoPlayer from "./components/VideoPLayer";
import GoogleLogin from "./components/GoogleLogin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"
import Treding from "./pages/Treding";
import LikedVideos from "./pages/LikedVideos";
import Library from "./pages/Library";
import MyVideos from "./pages/MyVideos";
import History from "./pages/History"
import WatchLater from "./pages/WatchLater"

import "./App.css"

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/listVideosChannel/:channelId"
          element={
            <div className="container-fluid">
              <Header />
              <div className="row position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <ListVideosChannel />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/video/:videoId"
          element={
            <div className=" container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-8">
                  <VideoPlayer />
                </div>
                <div className="col-4">
                  <Channels />
                </div>
              </div>
            </div>
          }
        />

        <Route
          path="/search/:searchQuery"
          element={
            <div className="container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <SearchPage />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/myChannel"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <Channels />
                </div>
              </div>
            </div>
          }
        />


        <Route
          exact
          path="/home"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < HomePage />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/trending"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < Treding />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/library"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < Library />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/yourvideos"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < MyVideos />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/history"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < History />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/watchlater"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < WatchLater />
                </div>
              </div>
            </div>
          }
        />


        <Route
          exact
          path="/LikedVideos"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row  position-top">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  < LikedVideos />
                </div>
              </div>
            </div>
          }
        />


        <Route
          exact
          path="/"
          element={
            <div className="app__mainpage container-fluid">
              <div className="row  position-top">
                <div className="col-12 ">
                  <GoogleLogin />
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
