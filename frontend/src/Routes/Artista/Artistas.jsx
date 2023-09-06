import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CgPlayListSearch } from "react-icons/cg";
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
            to="CrearArtista"
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
          {artistas.length > 0
            ? artistas.map((artista) => (
                <li key={artista.id_artist} className="list-group-item">
                  <div className="row">
                    <div className="col-sm-1 d-flex align-items-center">
                      <img
                        src={artista.profilePhoto}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded img-fluid m-3"
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
                    <div className="col-sm-2 d-flex align-items-center">
                      <Link
                        to={`${artista.id_artist}`}
                        className="btn btn-secondary m-1"
                        type="button"
                      >
                        Modificar
                      </Link>
                      <button
                        className="btn btn-danger m-1"
                        type="button"
                        value={artista.id_artist}
                        onClick={(e) => {
                          handlerEliminar(e.target.value);
                        }}
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
