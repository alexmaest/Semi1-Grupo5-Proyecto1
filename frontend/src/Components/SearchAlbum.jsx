import React, { useState } from "react";
import { CgPlayListSearch } from "react-icons/cg";

export default function SearchAlbum(props) {
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
          {props.data.name} <br /> <small className="text-muted">{props.data.description}</small>
        </p>
      </div>
      <div className="col-sm-3 d-flex align-items-center justify-content-center">
        <button className="btn btn-warning m-1 col-sm-12" type="button">
          <CgPlayListSearch />
        </button>
      </div>
    </div>
  );
}
