import React, { useState, useLayoutEffect } from "react";
import { ModalBody, ModalHeader } from "reactstrap";
import { CgAdd, CgPlayListSearch } from "react-icons/cg";
import ITPForm from "../../Components/ITPForm";

const api = import.meta.env.VITE_API;

export default function PlaylistCreate(props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [src, setSrc] = useState("");

  return (
    <>
      <ModalHeader>
        <p className="h4">Crear Playlist</p>
      </ModalHeader>
      <ModalBody>
        <div className="form-group row">
          <div className="col-sm-6">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value={"Nombre: "}
            ></input>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="form-group row mt-4">
          <div className="col-sm-6">
            <input
              type="text"
              readOnly
              className="form-control-plaintext"
              value={"Descripcion: "}
            ></input>
          </div>
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              onChange={(e) => {
                setDescripcion(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div className="form-group row mt-4">
          <label className="form-label col-sm-6">Foto:</label>
          <div className="col-sm-6">
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setSrc(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center mt-4">
          <img
            src={src}
            alt=""
            style={{ maxWidth: "200px", maxHeight: "200px" }}
            className="img-fluid rounded"
          />
        </div>
        <div className="row mt-4">
          <input type="submit" className="btn btn-primary" value={"Crear Playlist"}></input>
        </div>
      </ModalBody>
    </>
  );
}
