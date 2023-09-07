import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { BsMusicPlayerFill, BsSearch } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile, CgPlayList, CgHeadset } from "react-icons/cg";
import MediaPlayer from "../Components/MediaPlayer";

class Sidebar extends Component {
  state = {};

  logout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  render() {
    return (
      <>
        <div id="sidebar">
          <h1 onClick={this.logout}>Logout</h1>
          <div>
            <Link to={""}>
              <BsMusicPlayerFill />
              Home
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={"Buscar"}>
                  <BsSearch />
                  Buscar
                </Link>
              </li>
              <li>
                <Link to={"Playlist"}>
                  <CgPlayList />
                  Playlist
                </Link>
              </li>
              <li>
                <Link to={"Favoritos"}>
                  <MdFavoriteBorder />
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to={"Perfil"}>
                  <CgProfile />
                  Perfil
                </Link>
              </li>
              <li>
                <Link to={"Radio"}>
                  <CgHeadset />
                  Radio
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div
          id="detail"
          style={{
            display: "flex",
            flexDirection: "column",
            background:
              "linear-gradient(rgba(144, 88, 209, 0.637) 0%, rgb(0, 51, 102) 100%)",
          }}
        >
          <div style={{ overflow: "auto", flex: 1 }}>
            <Outlet />
          </div>
          <div style={{ order: 1 }}>
            <MediaPlayer />
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
