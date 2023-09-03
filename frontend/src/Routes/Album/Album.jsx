import { useLoaderData } from "react-router-dom";
import { CgPlayListSearch } from "react-icons/cg";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import React, { useState } from "react";

export async function loader() {
  const album = await fetch("http://localhost:5000/admin/album/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

    console.log(album)
  return album;
}

export default function Album() {
  const datos = useLoaderData();
  const [album, setAlbum] = useState(datos.albums);
  const [buscar, setBuscar] = useState(0);

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
            onClick={(e) => {
              e.preventDefault();
              console.log(buscar);
              if (buscar === "") {
                fetch("http://localhost:5000/admin/album/")
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    setAlbum(data.albums);
                  });
                return;
              }
              fetch("http://localhost:5000/admin/album/" + buscar)
                .then((response) => response.json())
                .then((data) => {
                  if (data.album != null) {
                    setAlbum([data.album]);
                  } else {
                    setAlbum([]);
                  }
                });
            }}
          >
            <CgPlayListSearch />
          </button>
          <Link to="CrearAlbum"
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
                      <Link to={`${album.id_album}`}
                        className="btn btn-secondary m-1"
                        type="button"
                      >
                        Modificar
                      </Link>
                      <button className="btn btn-danger m-1" type="button">
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
