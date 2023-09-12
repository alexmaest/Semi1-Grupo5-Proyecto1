import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ITForm from "../Components/ITPForm";
import axios from "axios";

const api = import.meta.env.VITE_API;

export async function loader() {
  const datos = await axios({
    url: api + "/profile/" + sessionStorage.getItem("id"),
    method: "GET",
  }).then((response) => {
    return response.data;
  });

  return datos;
}

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

export default function Perfil() {
  const datos = useLoaderData();
  const id = datos.results[0].Id;
  const [nombre, changeNombre] = useState(datos.results[0].Id);
  const [apellido, changeApellido] = useState(datos.results[0].Apellido);
  const [correo, changeCorreo] = useState(datos.results[0].Correo);
  const [fechaNacimiento, changeFechaNac] = useState(
    datos.results[0].Fecha_nac
  );
  const [psw, changePsw] = useState(datos.results[0].Psw);
  const [confirmPsw, changeConfirmPsw] = useState(datos.results[0].Psw);
  const [fotoPerfil, changeFotoPerfil] = useState(datos.results[0].Src);

  async function submitHandler(e) {
    e.preventDefault();

    if (psw === confirmPsw) {
      let result;

      if (fotoPerfil === datos.results[0].Src) result = "";
      else result = await convertBase64(fotoPerfil);

      axios({
        url: api + "/profile",
        method: "PUT", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_user: id,
          firstName: nombre === "" ? null : nombre,
          lastName: apellido === "" ? null : apellido,
          email: correo === "" ? null : correo,
          password: psw === "" ? null : psw,
          profilePhoto: result === "" ? null : result,
        }),
      })
        .then((response) => {
          if (response.statusText === "OK") {
            alert("Modificado exitosamente.");
            window.location.reload();
          } else {
            alert("Error al modificar el artista.");
          }
        })
        .catch((error) => {
          console.error("Error de red:", error);
        });
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
            src={fotoPerfil}
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
                Apellidos:
                <ITForm value={apellido} change={changeApellido} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Correo:
                <ITForm value={correo} change={changeCorreo} />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Nueva Contraseña:
                <div className="form-group row">
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="New Password"
                      onChange={(e) => {
                        changePsw(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Verify Password"
                      onChange={(e) => {
                        changeConfirmPsw(e.target.value);
                      }}
                    ></input>
                  </div>
                </div>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Fecha de Nacimiento: {fechaNacimiento}
                <input
                  type="date"
                  className="form-control"
                  onChange={(e) => {
                    changeFechaNac(e.target.value);
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
                  accept="image/*"
                  onChange={(e) => {
                    changeFotoPerfil(URL.createObjectURL(e.target.files[0]));
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
