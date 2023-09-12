import React, { useState } from "react";
import { CgPlayButtonO, CgPlayListAdd, CgHeart } from "react-icons/cg";
import axios from "axios";

const api = import.meta.env.VITE_API;

export default function SearchSong(props) {
  function hadlerFavorite() {
    axios({
      url: api + "/user/like",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        userId: sessionStorage.getItem("id"),
        songId: props.data.id_song,
        albumId: props.data.id_album,
        artistId: props.data.id_artist,
      },
    }).then((respose) => {
      const data = respose.data;
      alert(data.message);
    });
  }

  function handlerPlay() {
    sessionStorage.setItem("tracks", JSON.stringify([props.data.id_song]));
    sessionStorage.setItem("noSong", 0);
  }

  function handlerPlayList() {
    const tracks = JSON.parse(sessionStorage.getItem("tracks")) || [];
    tracks.push(props.data.id_song);
    sessionStorage.setItem("tracks", JSON.stringify(tracks));
  }

  return (
    <div className="row m-2">
      <div className="col-sm-1 d-flex align-items-center">
        <img
          src={props.data.coverPhoto}
          alt=""
          style={{ width: "50px", height: "50px" }}
          className="rounded img-fluid"
        ></img>
      </div>
      <div className="col-sm-8 d-flex align-items-center">
        <p className="h3">
          {props.data.name + " - " + props.data.duration} <br />
          <small className="text-muted">
            {props.data.artist} - {props.data.album}
          </small>
        </p>
      </div>
      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        <button
          className="btn btn-danger m-1 col-sm-4"
          type="button"
          onClick={hadlerFavorite}
        >
          <CgHeart />
        </button>
        <button
          className="btn btn-success m-1 col-sm-4"
          type="button"
          onClick={handlerPlay}
        >
          <CgPlayButtonO />
        </button>
        <button
          className="btn btn-primary m-1 col-sm-4"
          type="button"
          onClick={handlerPlayList}
        >
          <CgPlayListAdd />
        </button>
      </div>
    </div>
  );
}
