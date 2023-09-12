import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import "./Historico.css";
import axios from "axios";

const api = import.meta.env.VITE_API;

export async function loader() {
  const id = sessionStorage.getItem("id");
  const fetchCanciones = await axios({
    url: api + "/user/topSongs/" + id,
    method: "GET",
  });
  const fetchArtistas = await axios({
    url: api + "/user/topArtists/" + id,
    method: "GET",
  });
  const fetchAlbumes = await axios({
    url: api + "/user/topAlbums/" + id,
    method: "GET",
  });
  const fetchHistorial = await axios({
    url: api + "/user/history/" + id,
    method: "GET",
  });

  const data = await fetchCanciones.data;
  const data2 = await fetchArtistas.data;
  const data3 = await fetchAlbumes.data;
  const data4 = await fetchHistorial.data;
  return { data, data2, data3, data4 };
}

function HomeUser() {
  const datos = useLoaderData();
  const [Canciones, setCanciones] = useState(datos.data.success);
  const [Artistas, setArtistas] = useState(datos.data2.success);
  const [Albumes, setAlbumes] = useState(datos.data3.success);
  const [Historial, setHistorial] = useState(datos.data4.success);
  let contador = 1;
  let contador2 = 1;
  let contador3 = 1;
  let contador4 = 1;

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
