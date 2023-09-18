import React, { useState } from "react";
import { CgPlayButtonO } from "react-icons/cg";

function PlayButton(props) {
  function handlerPlay() {
    sessionStorage.setItem("tracks", JSON.stringify([props.id]));
    sessionStorage.setItem("noSong", 0);
  }

  return (
      <button
        className="btn btn-success col-sm-12"
        type="button"
        onClick={handlerPlay}
      >
        <CgPlayButtonO />
      </button>
  );
}

export default PlayButton;
