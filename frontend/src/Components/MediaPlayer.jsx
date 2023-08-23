import React, { Component } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

class MediaPlayer extends Component {
  
  render() {
    return (
      <div>
        <AudioPlayer
          volume="0.5"
          style={{
            borderRadius: "1rem",
            color: "white",
            background: "#1b1a22",
          }}
          src={this.props.playlist[this.props.currentTrack].src}
          showSkipControls={true}
          showJumpControls={false}
          header={this.props.playlist[this.props.currentTrack].title}
          onClickNext={this.props.nextSong}
          onClickPrevious={this.props.previousSong}
          onEnded={this.props.nextSong}
          autoPlayAfterSrcChange={true}
          //autoPlay={true}
        />
      </div>
    );
  }
}

export default MediaPlayer;
