import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import { BsMusicPlayerFill, BsSearch } from "react-icons/bs";
import { MdFavoriteBorder } from "react-icons/md";
import { CgProfile, CgPlayList } from "react-icons/cg";
import MediaPlayer from "../Components/MediaPlayer";

class Sidebar extends Component {
  render() {
    return (
      <>
        <div id="sidebar">
          <h1>Grupo 5 - Spotify</h1>
          <div>
            <Link to={`/`}>
              <BsMusicPlayerFill />
              Home
            </Link>
          </div>
          <nav>
            <ul>
              <li>
                <Link to={"/"}>
                  <BsSearch />
                  Buscar
                </Link>
              </li>
              <li>
                <Link to={"/Playlist"}>
                  <CgPlayList />
                  Playlist
                </Link>
              </li>
              <li>
                <Link to={"/Favoritos"}>
                  <MdFavoriteBorder />
                  Favoritos
                </Link>
              </li>
              <li>
                <Link to={"/Perfil"}>
                  <CgProfile />
                  Perfil
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ overflow: "auto", flex: 1 }}>
            <Outlet />
          </div>
          <div style={{ order: 1 }}>
            <MediaPlayer
              currentTrack={this.props.currentTrack}
              playlist={this.props.playlist}
              nextSong={this.props.nextSong}
              previousSong={this.props.previousSong}
            />
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
