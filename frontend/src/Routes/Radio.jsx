import React, { Component } from "react";
const api = import.meta.env.VITE_API;

class Radio extends Component {
  state = {
    src: "",
    tracks: JSON.parse(sessionStorage.getItem("tracks")) || [],
  };

  componentDidMount() {
    sessionStorage.setItem("radio", true);

    if (this.state.tracks[0] != 0) {
      fetch(api + "/admin/song/" + this.state.tracks[0])
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            src: data.song.coverPhoto,
            tracks: this.state.tracks,
          });
        });
    }

    this.trackChange = setInterval(() => {
      const updatedTracks = JSON.parse(sessionStorage.getItem("tracks")) || [];

      if (JSON.stringify(updatedTracks) !== JSON.stringify(this.state.tracks)) {
        fetch(api + "/admin/song/" + updatedTracks[0])
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              src: data.song.coverPhoto,
              tracks: updatedTracks,
            });
          });
      }
    }, 1000);
  }

  componentWillUnmount() {
    sessionStorage.setItem("radio", false);
    clearInterval(this.trackChange);
  }

  render() {
    return (
      <div
        style={{ height: "100%", width: "100%", maxWidth: "100%" }}
        className="d-flex align-items-center justify-content-center"
      >
        <div
          style={{ width: "60%", height: "60%" }}
          className="d-flex align-items-center justify-content-center"
        >
          <img src={this.state.src} alt="" className="img-fluid rounded"></img>
        </div>
      </div>
    );
  }
}

export default Radio;
