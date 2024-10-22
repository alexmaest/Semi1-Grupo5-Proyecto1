import React, { useState } from "react";
import { CgPlayListSearch } from "react-icons/cg";

export default function SearchArtist(props) {
  return (
    <div className="row m-2">
      <div className="col-sm-1 d-flex align-items-center">
        <img
          src={props.data.profilePhoto}
          alt=""
          style={{ width: "50px", height: "50px" }}
          className="rounded img-fluid"
        ></img>
      </div>
      <div className="col-sm-8 d-flex align-items-center">
        <p className="h3">{props.data.name}</p>
      </div>
      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        <button
          className="btn btn-info m-1 col-sm-12"
          type="button"
          onClick={() => {
            props.setOpen(true);
            props.setSongs(props.data.songs);
          }}
        >
          <CgPlayListSearch />
        </button>
      </div>
    </div>
  );
}
