import React, { useEffect, useState } from "react";
import "./Historico.css";

const api = import.meta.env.VITE_API;

function HomeUser() {
  const [Canciones, setCanciones] = useState();
  const [Artistas, setArtistas] = useState();
  const [Albumes, setAlbumes] = useState();
  const [Historial, setHistorial] = useState();
  let contador = 1;
  let contador2 = 1;
  let contador3 = 1;
  let contador4 = 1;

  async function cargarDatos() {
    await fetch(api + "/user/topSongs/" + sessionStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        setCanciones(data.success);
      });
    await fetch(api + "/user/topAlbums/" + sessionStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        setAlbumes(data.success);
      });
    await fetch(api + "/user/topArtists/" + sessionStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        setArtistas(data.success);
      });
    await fetch(api + "/user/history/" + sessionStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        setHistorial(data.success);
      });
  }

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <div className="container">
      <h1 className="tipografia3-detalles" style={{ fontSize: "40px" }}>
        TOP 5 CANCIONES
      </h1>
      <div className="row flex-nowrap overflow-auto" id="contenedor">
        {Canciones
          ? Canciones.map((cancion) => (
              <div className="col-3" key={contador}>
                <div className="card border-secondary">
                  <div
                    className="card-header tipografia3-detalles"
                    style={{ fontSize: 20 }}
                  >
                    TOP {contador++}
                  </div>
                  <div className="card-body">
                    <p
                      className="card-text text-center tipografia3-detalles"
                      style={{ fontSize: 30 }}
                    >
                      {`${cancion.Nombre_Cancion} \nReproducciones: ${cancion.Cantidad_Reproducciones}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <h1
        className="tipografia3-detalles"
        style={{ fontSize: "40px", paddingTop: "40px" }}
      >
        TOP 3 ARTISTAS
      </h1>
      <div className="row flex-nowrap overflow-auto" id="contenedor">
        {Artistas
          ? Artistas.map((artista) => (
              <div className="col-3" key={contador2}>
                <div className="card border-secondary">
                  <div
                    className="card-header tipografia3-detalles"
                    style={{ fontSize: 20 }}
                  >
                    TOP {contador2++}
                  </div>
                  <div className="card-body">
                    <p
                      className="card-text text-center tipografia3-detalles"
                      style={{ fontSize: 30 }}
                    >
                      {`${artista.Nombre_Artista} \nReproducciones: ${artista.Total_Reproducciones}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <h1
        className="tipografia3-detalles"
        style={{ fontSize: "40px", paddingTop: "40px" }}
      >
        TOP 5 ALBUMES
      </h1>
      <div className="row flex-nowrap overflow-auto" id="contenedor">
        {Albumes
          ? Albumes.map((album) => (
              <div className="col-3" key={contador3}>
                <div className="card border-secondary">
                  <div
                    className="card-header tipografia3-detalles"
                    style={{ fontSize: 20 }}
                  >
                    TOP {contador3++}
                  </div>
                  <div className="card-body">
                    <p
                      className="card-text text-center tipografia3-detalles"
                      style={{ fontSize: 30 }}
                    >
                      {`${album.Nombre_Album} \nReproducciones: ${album.Total_Reproducciones}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
      <h1
        className="tipografia3-detalles"
        style={{ fontSize: "40px", paddingTop: "40px" }}
      >
        HISTORIAL
      </h1>
      <div className="row flex-nowrap overflow-auto" id="contenedor">
        {Historial
          ? Historial.map((dato) => (
              <div className="col-3" key={contador4}>
                <div className="card border-secondary">
                  <div
                    className="card-header tipografia3-detalles"
                    style={{ fontSize: 20 }}
                  >
                    {contador4++}
                  </div>
                  <div className="card-body">
                    <p
                      className="card-text text-center tipografia3-detalles"
                      style={{ fontSize: 30 }}
                    >
                      {`${dato.Nombre_Cancion}`}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default HomeUser;
