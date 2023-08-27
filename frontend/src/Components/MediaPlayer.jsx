import React, { Component } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

class MediaPlayer extends Component {
  state = {
    title: "",
    src: "",
  }

  nextSong = () => {
    this.setState({
      title: "",
      src: "",
    });
  };

  previousSong = () => {
    this.setState({
      title: "",
      src: "",
    });
  };

  render() {
    return (
      <div>
        <AudioPlayer
          volume="0.5"
          style={{
            borderRadius: "1rem",
            color: "white",
            background: "#2f2f33",
          }}
          src={this.state.src}
          showSkipControls={true}
          showJumpControls={false}
          header={this.state.title}
          onClickNext={this.state.nextSong}
          onClickPrevious={this.previousSong}
          onEnded={this.nextSong}
          autoPlayAfterSrcChange={true}
          //autoPlay={true}
        />
      </div>
    );
  }
}

export default MediaPlayer;
