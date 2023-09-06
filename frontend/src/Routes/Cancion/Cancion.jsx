import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CgPlayListSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";

const api = import.meta.env.VITE_API;

export async function loader() {
  const canciones = await fetch(api + "/admin/song/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return canciones;
}

export default function Canciones() {
  const datos = useLoaderData();
  const [canciones, setArtistas] = useState(datos.songs);
  const [buscar, setBuscar] = useState(0);

  function handlerEliminar(param) {
    fetch(api + "/admin/song/" + param, {
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
      fetch(api + "/admin/song/")
        .then((response) => response.json())
        .then((data) => {
          setArtistas(data.songs);
        });
      return;
    }
    fetch(api + "/admin/song/" + buscar)
      .then((response) => response.json())
      .then((data) => {
        if (data.song != null) {
          setArtistas([data.song]);
        } else {
          setArtistas([]);
        }
      });
  }

  return (
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
            to="CrearCancion"
            style={{ textDecoration: "none" }}
            className="btn btn-primary col-sm-1 m-1"
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
          {canciones.length > 0
            ? canciones.map((cancion) => (
                <li key={cancion.id_song} className="list-group-item">
                  <div className="row">
                    <div className="col-sm-1 d-flex align-items-center">
                      <img
                        src={cancion.coverPhoto}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded img-fluid m-3"
                      ></img>
                    </div>
                    <div className="col-sm-8 d-flex align-items-center">
                      <p className="h3">
                        {"ID:" + cancion.id_song + " - " + cancion.name}
                        <br />
                        <small className="text-muted">
                          {"Artist ID: " +
                            cancion.artist +
                            " - Album ID: " +
                            cancion.album}
                        </small>
                      </p>
                    </div>
                    <div className="col-sm-2 d-flex align-items-center">
                      <Link
                        to={`${cancion.id_song}`}
                        className="btn btn-secondary m-1"
                        type="button"
                      >
                        Modificar
                      </Link>
                      <button
                        className="btn btn-danger m-1"
                        type="button"
                        value={cancion.id_song}
                        onClick={(e) => handlerEliminar(e.target.value)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}
