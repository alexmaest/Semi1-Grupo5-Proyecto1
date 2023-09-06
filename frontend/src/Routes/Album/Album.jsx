import { useLoaderData } from "react-router-dom";
import { CgPlayListSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import React, { useState } from "react";

const api = import.meta.env.VITE_API;

export async function loader() {
  const album = await fetch(api + "/admin/album/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return album;
}

export default function Album() {
  const datos = useLoaderData();
  const [album, setAlbum] = useState(datos.albums);
  const [buscar, setBuscar] = useState(0);

  function handlerEliminar(param) {
    fetch(api + "/admin/album/" + param, {
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
      fetch(api + "/admin/album/")
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data.albums);
        });
      return;
    }
    fetch(api + "/admin/album/" + buscar)
      .then((response) => response.json())
      .then((data) => {
        if (data.album != null) {
          setAlbum([data.album]);
        } else {
          setAlbum([]);
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
              placeholder="Buscar ID Album"
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
            to="CrearAlbum"
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
          {album.length > 0
            ? album.map((album) => (
                <li key={album.id_album} className="list-group-item">
                  <div className="row">
                    <div className="col-sm-1 d-flex align-items-center">
                      <img
                        src={album.coverPhoto}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded img-fluid m-3"
                      ></img>
                    </div>
                    <div className="col-sm-8 d-flex align-items-center">
                      <p className="h3">
                        {album.name}
                        <br />
                        <small className="text-muted">
                          {"ID: " + album.id_album + " - " + album.description}
                        </small>
                      </p>
                    </div>
                    <div className="col-sm-2 d-flex align-items-center">
                      <Link
                        to={`${album.id_album}`}
                        className="btn btn-secondary m-1"
                        type="button"
                      >
                        Modificar
                      </Link>
                      <button
                        className="btn btn-danger m-1"
                        type="button"
                        value={album.id_album}
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
