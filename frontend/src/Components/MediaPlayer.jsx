import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const api = import.meta.env.VITE_API;

class MediaPlayer extends Component {
  state = {
    id: 0,
    src: "",
    title: "",
  };

  nextSong = () => {
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    sessionStorage.setItem(
      "noSong",
      parseInt(sessionStorage.getItem("noSong")) >= tracks.length - 1
        ? 0
        : (parseInt(sessionStorage.getItem("noSong")) + 1) % tracks.length
    );

    fetch(api + "/admin/song/" + tracks[sessionStorage.getItem("noSong")])
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data.song.name + " - " + data.song.duration,
          src: data.song.songFile,
          id: data.song.id_song,
        });
      });
  };

  nextSongR = () => {
    fetch(api + "/user/random/")
      .then((response) => response.json())
      .then((data) => {
        sessionStorage.setItem("tracks", JSON.stringify([data.song.id_song]));
        sessionStorage.setItem("noSong", 0);
        this.setState({
          title: data.song.name + " - " + data.song.duration,
          src: data.song.songFile,
          id: data.song.id_song,
        });
      });
  };

  previousSong = () => {
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    sessionStorage.setItem(
      "noSong",
      parseInt(sessionStorage.getItem("noSong")) === 0
        ? 0
        : parseInt(sessionStorage.getItem("noSong")) - 1
    );

    fetch(api + "/admin/song/" + tracks[sessionStorage.getItem("noSong")])
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          title: data.song.name + " - " + data.song.duration,
          src: data.song.songFile,
          id: data.song.id_song,
        });
      });
  };

  errorSong = () => {
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    if (this.state.id != parseInt(tracks[sessionStorage.getItem("noSong")])) {
      const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
      sessionStorage.setItem(
        "noSong",
        parseInt(sessionStorage.getItem("noSong")) >= tracks.length - 1
          ? 0
          : (parseInt(sessionStorage.getItem("noSong")) + 1) % tracks.length
      );

      fetch(api + "/admin/song/" + tracks[sessionStorage.getItem("noSong")])
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            title: data.song.name + " - " + data.song.duration,
            src: data.song.songFile,
            id: data.song.id_song,
          });
        });
    }
  };

  render() {
    return (
      <div>
        <AudioPlayer
          volume="0.5"
          style={{
            fontSize: "1.5rem",
            borderRadius: "1rem",
            color: "white",
            background: "#2f2f33",
          }}
          src={this.state.src}
          showSkipControls={true}
          showJumpControls={false}
          header={this.state.title}
          onClickNext={
            sessionStorage.getItem("radio") === "true"
              ? this.nextSongR
              : this.nextSong
          }
          onClickPrevious={
            sessionStorage.getItem("radio") === "true"
              ? null
              : this.previousSong
          }
          onListen={
            sessionStorage.getItem("radio") === "true" ? null : this.errorSong
          }
          onError={
            sessionStorage.getItem("radio") === "true"
              ? this.nextSongR
              : this.errorSong
          }
          onPlayError={
            sessionStorage.getItem("radio") === "true"
              ? this.nextSongR
              : this.errorSong
          }
          onEnded={
            sessionStorage.getItem("radio") === "true"
              ? this.nextSongR
              : this.nextSong
          }
          autoPlayAfterSrcChange={true}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default MediaPlayer;
