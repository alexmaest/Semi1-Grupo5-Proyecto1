import React, { useState, useLayoutEffect, useEffect } from "react";
import { ModalBody, ModalHeader } from "reactstrap";

const api = import.meta.env.VITE_API;

export default function PlaylistUpdate(props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [src, setSrc] = useState(props.playlist.Src);

  async function convertBase64(file) {
    var myInit = {
      method: "GET",
      mode: "no-cors",
    };

    var myRequest = new Request(file, myInit);
    return await fetch(myRequest)
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(blob);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      });
  }

  async function handlerSubmit(e) {
    e.preventDefault();

    let result;
    if (src === props.playlist.Src) result = "";
    else result = await convertBase64(src);

    fetch(api + "/playlist/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: props.playlist.Id,
        Nombre: nombre === "" ? props.playlist.Nombre : nombre,
        Descripcion:
          descripcion === "" ? props.playlist.Descripcion : descripcion,
        Src: result === "" ? null : src,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.success);
        window.location.reload();
      });
  }

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
              value={"Nombre: " + props.playlist.Nombre}
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
              value={"Descripcion: " + props.playlist.Descripcion}
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
          <input
            type="submit"
            className="btn btn-primary"
            value={"Actualizar"}
            onClick={handlerSubmit}
          ></input>
        </div>
      </ModalBody>
    </>
  );
}
