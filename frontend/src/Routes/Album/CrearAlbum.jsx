import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../../Components/ITPForm";

const api = import.meta.env.VITE_API;

export async function loader() {
  const artistas = await fetch(api + "/admin/artist/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  console.log(artistas);
  return artistas;
}

export default function CrearAlbum() {
  const datos = useLoaderData();
  const [nombre, changeNombre] = useState("");
  const [foto, changeFoto] = useState("");
  const [src, changeSrc] = useState("");
  const [descripcion, changeDescripcion] = useState("");
  const [id_artista, changeIdArtista] = useState(0);

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
      fetch(api + "/admin/album", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nombre,
          description: descripcion,
          profilePhoto: result,
          artistId: id_artista,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Album creado exitosamente.");
          } else {
            alert("Error al crear el album.");
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
      <div>
        <div className="row">
          <h1>Creando Album</h1>
        </div>
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
                  <ITForm value={"Descripcion: "} change={changeDescripcion} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <label className="form-label mt-4">Foto:</label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      changeSrc(URL.createObjectURL(e.target.files[0]));
                      changeFoto(e.target.files[0]);
                    }}
                  />
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
                        onChange={(e) => {
                          console.log(e.target.value);
                          changeIdArtista(e.target.value);
                        }}
                      >
                        <option value={0}>Seleccione un Artista</option>
                        {datos.artists.map((artista) => (
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
    </div>
  );
}
