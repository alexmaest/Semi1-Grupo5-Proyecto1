import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../../Components/ITPForm";

export async function loader({ params }) {
  console.log(params);
  const artistas = await fetch("http://localhost:5000/admin/artist/"+params.id)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return artistas;
}

export default function ModificarArtista() {
    const datos = useLoaderData();

  const [nombre, changeNombre] = useState(datos.artist.name);
  const [foto, changeFoto] = useState(datos.artist.profilePhoto);
  const [fecha, changeFecha] = useState(datos.artist.birthday);
  const id = datos.artist.id_artist;

  function submitHandler(e) {
    e.preventDefault();

    if (this.state.psw === this.state.confirmPsw && this.state.psw != "") {
      alert("Datos Actualizados");
      console.log(this.datos);
    } else {
      alert("Verifique los valores de password");
    }
  };

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
                Nombres:
                <ITForm value={nombre} change={changeNombre} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Fecha de Nacimiento: {fecha}
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    changeFecha(e.target.value);
                  }}
                ></input>
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
