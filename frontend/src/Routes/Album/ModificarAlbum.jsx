import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../../Components/ITPForm";

export async function loader({ params }) {
  console.log(params);
  const datosAlbum = await fetch("http://localhost:5000/admin/album/" + params.id)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  const datosArtistas = await fetch("http://localhost:5000/admin/artist/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return { datosArtistas, datosAlbum };
}

export default function ModificarAlbum() {
  const {datosArtistas, datosAlbum} = useLoaderData();
  console.log(datosArtistas);
  console.log(datosAlbum);

  const [nombre, changeNombre] = useState(datosAlbum.album.name);
  const [foto, changeFoto] = useState(datosAlbum.album.coverPhoto);
  const [descripcion, changeDescripcion] = useState(datosAlbum.album.description);
  const [id_artista, changeIdArtista] = useState(datosAlbum.album.artistId);
  const id = datosAlbum.album.id_album;
  const artistas = datosArtistas.artists;

  function submitHandler(e) {
    e.preventDefault();

    if (this.state.psw === this.state.confirmPsw && this.state.psw != "") {
      alert("Datos Actualizados");
      console.log(this.datos);
    } else {
      alert("Verifique los valores de password");
    }
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
            src={foto}
            alt=""
            className="rounded mx-auto d-block img-fluid m-3"
          />
          <p className="h3 text-center">ID: {id}</p>
        </div>
        <div className="col-sm-8 col-md-8">
          <form>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Nombre:
                <ITForm value={nombre} change={changeNombre} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Descripcion:
                <ITForm value={descripcion} change={changeDescripcion} />
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
                      <select className="form-select" defaultValue={id_artista} onChange={(e)=>{ console.log(e.target.value); changeIdArtista(e.target.value)}}>
                        <option value={0}>Seleccione un Artista</option>
                        {artistas.map((artista) => (
                          <option
                            key={artista.id_artist}
                            value={artista.id_artist}
                          >
                           {artista.id_artist +" - "+ artista.name}
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
                  accept="image/png, image/jpeg"
                  onChange={() => {
                    changeFoto(URL.createObjectURL(e.target.files[0]));
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