import React, { Component } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";

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

    if (tracks[sessionStorage.getItem("noSong")] != this.state.id) {
      axios({
        method: "post",
        url: api + "/user/play",
        headers: { "Content-Type": "application/json" },
        data: {
          userId: sessionStorage.getItem("id"),
          songId: tracks[sessionStorage.getItem("noSong")],
        },
      }).then((response) => {
        const data = response.data;
        this.setState({
          title: data.song.name + " - " + data.song.duration,
          src: data.song.songFile,
          id: data.song.id_song,
        });
      });
    }
  };

  nextSongR = async () => {
    let title = "";
    let src = "";
    let id = this.state.id;
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    while (tracks[0] == id) {
      await axios({
        method: "post",
        url: api + "/user/random",
        headers: { "Content-Type": "application/json" },
        data: {
          userId: sessionStorage.getItem("id"),
        },
      }).then((response) => {
        const data = response.data;
        title = data.song.name + " - " + data.song.duration;
        src = data.song.songFile;
        id = data.song.id_song;
      });
    }

    sessionStorage.setItem("tracks", JSON.stringify([id]));
    sessionStorage.setItem("noSong", 0);

    this.setState({
      title: title,
      src: src,
      id: id,
    });
  };

  previousSong = () => {
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    const noSong = parseInt(sessionStorage.getItem("noSong"));
    sessionStorage.setItem("noSong", noSong == 0 ? 0 : noSong - 1);

    if (this.state.id != tracks[parseInt(sessionStorage.getItem("noSong"))]) {
      console.log(this.state.id,tracks[parseInt(sessionStorage.getItem("noSong"))]);
      axios({
        method: "post",
        url: api + "/user/play",
        headers: { "Content-Type": "application/json" },
        data: {
          userId: sessionStorage.getItem("id"),
          songId: tracks[parseInt(sessionStorage.getItem("noSong"))],
        },
      }).then((response) => {
        const data = response.data;
        this.setState({
          title: data.song.name + " - " + data.song.duration,
          src: data.song.songFile,
          id: data.song.id_song,
        });
      });
    }
  };

  handlerOnClickNext = () => {
    if (sessionStorage.getItem("radio") === "true") {
      this.nextSongR();
    } else {
      this.nextSong();
    }
  };

  handlerOnListen = async () => {
    if (sessionStorage.getItem("radio") === "false") {
      const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
      const noSong = parseInt(sessionStorage.getItem("noSong"));
      console.log("Onlisten");
      if (tracks[noSong] != this.state.id) {
        await axios({
          method: "post",
          url: api + "/user/play",
          headers: { "Content-Type": "application/json" },
          data: {
            userId: sessionStorage.getItem("id"),
            songId: tracks[noSong],
          },
        }).then((response) => {
          const data = response.data;
          this.setState({
            title: data.song.name + " - " + data.song.duration,
            src: data.song.songFile,
            id: data.song.id_song,
          });
        });
      }
    }
  };

  handlerOnClickPrevious = () => {
    if (sessionStorage.getItem("radio") !== "true") {
      this.previousSong();
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
          onClickNext={this.handlerOnClickNext}
          onClickPrevious={this.handlerOnClickPrevious}
          onEnded={this.handlerOnClickNext}
          autoPlayAfterSrcChange={true}
          autoPlay={true}
        />
      </div>
    );
  }
}

export default MediaPlayer;
