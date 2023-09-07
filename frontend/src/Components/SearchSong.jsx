import React, { useState } from "react";
import { CgPlayButtonO, CgPlayListAdd, CgHeart } from "react-icons/cg";

export default function SearchSong(props) {
  return (
    <div className="row">
      <div className="col-sm-1 d-flex align-items-center">
        <img
          src={props.data.coverPhoto}
          alt=""
          style={{ width: "50px", height: "50px" }}
          className="rounded img-fluid m-3"
        ></img>
      </div>
      <div className="col-sm-8 d-flex align-items-center">
        <p className="h3">
          {props.data.name} <br />{" "}
          <small className="text-muted">
            {props.data.artist} - {props.data.album}
          </small>
        </p>
      </div>
      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        <button className="btn btn-danger m-1 col-sm-4" type="button">
          <CgHeart />
        </button>
        <button
          className="btn btn-success m-1 col-sm-4"
          type="button"
          onClick={() => {
            sessionStorage.setItem(
              "tracks",
              JSON.stringify([props.data.id_song])
            );
            sessionStorage.setItem("noSong", 0);
          }}
        >
          <CgPlayButtonO />
        </button>
        <button className="btn btn-primary m-1 col-sm-4" type="button">
          <CgPlayListAdd />
        </button>
      </div>
    </div>
  );
}
