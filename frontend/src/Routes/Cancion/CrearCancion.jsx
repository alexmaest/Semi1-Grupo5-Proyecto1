import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../../Components/ITPForm";

const api = import.meta.env.VITE_API;

export async function loader({ params }) {
  console.log(params);
  const datosAlbum = await fetch(api + "/admin/album/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const datosArtistas = await fetch(api + "/admin/artist/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return { datosArtistas, datosAlbum };
}

export default function CrearCancion() {
  const { datosArtistas, datosAlbum } = useLoaderData();
  console.log(datosArtistas);
  console.log(datosAlbum);

  const [nombre, changeNombre] = useState("");
  const [foto, changeFoto] = useState("");
  const [duracion, changeDuracion] = useState("");
  const [src, changeSrc] = useState("");
  const [track, changeTrack] = useState();
  const [id_artista, changeIdArtista] = useState(0);
  const [id_album, changeIdAlbum] = useState(0);

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  function submitHandler(e) {
    e.preventDefault();
    convertBase64(foto).then((result) => {
      const formData = new FormData();

      formData.append("name", nombre);
      formData.append("duration", duracion);
      formData.append("artistId", id_artista);
      formData.append("albumId", id_album);
      formData.append("profilePhoto", result);
      formData.append("track", track);

      fetch("http://localhost:5000/admin/song", {
        method: "POST", // or 'PUT'
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            alert("Cancion creada exitosamente.");
          } else {
            alert("Error al crear la cancion.");
          }
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });
    });
  }

  return (
    <div
      className="container"
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="row">
        <div
          className="col-sm-4 col-md-4 rounded"
          style={{ background: "#2f2f33" }}
        >
          <img
            src={src}
            alt=""
            className="rounded mx-auto d-block img-fluid m-3"
          />
        </div>
        <div className="col-sm-8 col-md-8">
          <form>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <ITForm value={"Nombre: "} change={changeNombre} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <ITForm value={"Duracion"} change={changeDuracion} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="form-group row">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      value={"Artista: "}
                    ></input>
                  </div>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      defaultValue={0}
                      onChange={(e) => {
                        console.log(e.target.value);
                        changeIdArtista(e.target.value);
                      }}
                    >
                      <option value={0}>Seleccione un Artista</option>
                      {datosArtistas.artists.map((artista) => (
                        <option
                          key={artista.id_artist}
                          value={artista.id_artist}
                        >
                          {artista.id_artist + " - " + artista.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="form-group row">
                  <div className="col-sm-4">
                    <input
                      type="text"
                      readOnly
                      className="form-control-plaintext"
                      value={"Album: "}
                    ></input>
                  </div>
                  <div className="col-sm-8">
                    <select
                      className="form-select"
                      defaultValue={0}
                      onChange={(e) => {
                        console.log(e.target.value);
                        changeIdAlbum(e.target.value);
                      }}
                    >
                      <option value={0}>Seleccione un Album</option>
                      {datosAlbum.albums.map((album) => (
                        <option key={album.id_album} value={album.id_album}>
                          {album.id_album + " - " + album.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <label className="form-label mt-4">Foto:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    changeSrc(URL.createObjectURL(e.target.files[0]));
                    changeFoto(e.target.files[0]);
                  }}
                />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <label className="form-label mt-4">Cancion:</label>
                <input
                  className="form-control"
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    changeTrack(e.target.files[0]);
                  }}
                />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Guardar Cambios"
                  onClick={submitHandler}
                ></input>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
}
