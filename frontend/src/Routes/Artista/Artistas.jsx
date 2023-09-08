import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
  CgPlayListSearch,
  CgOptions,
  CgErase,
  CgEye
} from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const api = import.meta.env.VITE_API;

export async function loader() {
  const artistas = await fetch(api + "/admin/artist/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return artistas;
}

export default function Artistas() {
  const datos = useLoaderData();
  const [artistas, setArtistas] = useState(datos.artists);
  const [buscar, setBuscar] = useState(0);
  const [open, setOpen] = useState(false);
  const [datosArtista, setDatosArtista] = useState([]);

  function handlerEliminar(param) {
    fetch(api + "/admin/artist/" + param, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  }

  function handlerBuscar(e) {
    e.preventDefault();
    if (buscar === "") {
      fetch(api + "/admin/artist/")
        .then((response) => response.json())
        .then((data) => {
          setArtistas(data.artists);
        });
      return;
    }
    fetch(api + "/admin/artist/" + buscar)
      .then((response) => response.json())
      .then((data) => {
        if (data.artist != null) {
          setArtistas([data.artist]);
        } else {
          setArtistas([]);
        }
      });
  }

  function handlerView(datos) {
    setOpen(true);
    setDatosArtista(datos);
  }

  return (
    <>
      <div className="container">
        <form>
          <div className="row justify-content-md-center">
            <div className="col col-sm-8">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar ID Artista"
                onChange={(e) => {
                  setBuscar(e.target.value);
                }}
                style={{ height: "4rem" }}
              />
            </div>
            <button
              className="btn btn-secondary col-sm-1 m-1"
              onClick={handlerBuscar}
            >
              <CgPlayListSearch />
            </button>
            <Link
              to="CrearArtista"
              className="btn btn-primary col-sm-1 m-1 d-flex align-items-center justify-content-center text-decoration-none"
            >
              <BsPlusLg />
            </Link>
          </div>
        </form>
        <div
          className="container mt-5"
          style={{ maxHeight: "900px", overflowY: "auto" }}
        >
          <ul className="list-group">
            {artistas.length > 0
              ? artistas.map((artista) => (
                  <li key={artista.id_artist} className="list-group-item">
                    <div className="row m-2">
                      <div className="col-sm-1 d-flex align-items-center">
                        <img
                          src={artista.profilePhoto}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded img-fluid"
                        ></img>
                      </div>
                      <div className="col-sm-8 d-flex align-items-center">
                        <p className="h3">
                          {artista.name}
                          <br />
                          <small className="text-muted">
                            {"ID: "}
                            {artista.id_artist}
                          </small>
                        </p>
                      </div>
                      <div className="col-sm-3 d-flex align-items-center justify-content-center">
                        <button
                          className="col-sm-3 btn btn-info m-1"
                          type="button"
                          value={artista.id_artist}
                          onClick={(e) => handlerView(artista)}
                        >
                          <CgEye />
                        </button>
                        <Link
                          to={`${artista.id_artist}`}
                          className="col-sm-3 btn btn-warning m-1"
                          type="button"
                        >
                          <CgOptions />
                        </Link>
                        <button
                          className="col-sm-3 btn btn-danger m-1"
                          type="button"
                          value={artista.id_artist}
                          onClick={(e) => {
                            handlerEliminar(e.target.value);
                          }}
                        >
                          <CgErase />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
      <Modal isOpen={open} toggle={() => setOpen(false)} scrollable size="sg">
        <ModalHeader>
          <p className="h2">
            {datosArtista.name} <br />{" "}
            <small className="h4 text-muted">{`ID: ${datosArtista.id_artist}`}</small>
          </p>
        </ModalHeader>
        <ModalBody>
          <p className="h4">{`Birthday: ` + datosArtista.birthday}</p>
          <img style={{maxWidth:"50%"}} className="img-fluid" src={datosArtista.profilePhoto}></img>
        </ModalBody>
      </Modal>
    </>
  );
}
