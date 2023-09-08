import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../../Components/ITPForm";

const api = import.meta.env.VITE_API;

export async function loader({ params }) {
  const datosCancion = await fetch(api + "/admin/song/" + params.id)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

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

  return { datosCancion, datosArtistas, datosAlbum };
}

export default function ModificarCancion() {
  const { datosCancion, datosArtistas, datosAlbum } = useLoaderData();

  const [nombre, changeNombre] = useState(datosCancion.song.name);
  const [duracion, changeDuracion] = useState(datosCancion.song.duration);
  const [src, changeSrc] = useState(datosCancion.song.coverPhoto);
  const [id_artista, changeIdArtista] = useState(datosCancion.song.artist);
  const [id_album, changeIdAlbum] = useState(datosCancion.song.album);
  const id = datosCancion.song.id_song;

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

  async function submitHandler(e) {
    e.preventDefault();
    let result;
    if (datosCancion.song.coverPhoto === src) result = "";
    else result = await convertBase64(src);

    fetch(api + "/admin/song", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        songId: id,
        name: nombre === "" ? null : nombre,
        duration: duracion === "" ? null : duracion,
        artistId: id_artista === "" ? null : id_artista,
        albumId: id_album === "" ? null : id_album,
        profilePhoto: result === "" ? null : result,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Modificado exitosamente.");
          location.href = "/Administrador/Cancion";
        } else {
          alert("Error al modificar el artista.");
        }
      })
      .catch((error) => {
        console.error("Error de red:", error);
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
          <p className="h3 text-center">ID: {id}</p>
        </div>
        <div className="col-sm-8 col-md-8">
          <form>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Nombres:
                <ITForm value={nombre} change={changeNombre} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Duracion:
                <ITForm value={duracion} change={changeNombre} />
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
                      defaultValue={datosCancion.song.artist ? datosCancion.song.artist : 0}
                      onChange={(e) => {
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
                      defaultValue={datosCancion.song.album? datosCancion.song.album : 0}
                      onChange={(e) => {
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
                <label className="form-label mt-4">
                  Cambiar Foto de Perfil:
                </label>
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    changeSrc(URL.createObjectURL(e.target.files[0]));
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
