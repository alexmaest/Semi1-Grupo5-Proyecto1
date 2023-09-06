import React, { Component } from "react";
import ITForm from "../Components/ITPForm";
import { useLoaderData } from "react-router-dom";

const api = import.meta.env.VITE_API;

class Perfil extends Component {
  state = {
    id: "",
    nombre: "",
    apellido: "",
    correo: "",
    fechaNacimiento: "",
    psw: "",
    confirmPsw: "",
    fotoPerfil: "",
  };

  componentDidMount() {
    const datosAlbum = fetch(api + "/profile/" + sessionStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results[0]);
        this.setState({
          id: data.results[0].Id,
          nombre: data.results[0].Nombre,
          apellido: data.results[0].Apellido,
          correo: data.results[0].Correo,
          fechaNacimiento: data.results[0].Fecha_nac,
          fotoPerfil: data.results[0].Src,
        });
      });
  }

  changeNombre = (value) => {
    this.setState({ nombre: value });
  };

  changeApellido = (value) => {
    this.setState({ apellido: value });
  };

  changeCorreo = (value) => {
    this.setState({ correo: value });
  };

  changeFechaNac = (value) => {
    this.setState({ fechaNacimiento: value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    if (this.state.psw === this.state.confirmPsw && this.state.psw != "") {
      alert("Datos Actualizados");
    } else {
      alert("Verifique los valores de password");
    }
  };

  render() {
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
              src={this.state.fotoPerfil}
              alt=""
              className="rounded mx-auto d-block img-fluid m-3"
            />
            <p className="h3 text-center">ID: {this.state.id}</p>
          </div>
          <div className="col-sm-8 col-md-8">
            <form>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Nombres:
                  <ITForm
                    value={this.state.nombre}
                    change={this.changeNombre}
                  />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Apellidos:
                  <ITForm
                    value={this.state.apellido}
                    change={this.changeApellido}
                  />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Correo:
                  <ITForm
                    value={this.state.correo}
                    change={this.changeCorreo}
                  />
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
                          this.setState({ psw: e.target.value });
                        }}
                      ></input>
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Verify Password"
                        onChange={(e) => {
                          this.setState({ confirmPsw: e.target.value });
                        }}
                      ></input>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Fecha de Nacimiento: {this.state.fechaNacimiento}
                  <input
                    type="date"
                    className="form-control"
                    onChange={(e) => {
                      this.changeFechaNac(e.target.value);
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
                    onChange={() => {
                      this.setState({
                        fotoPerfil: URL.createObjectURL(e.target.files[0]),
                      });
                    }}
                  />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Guardar Cambios"
                    onClick={this.submitHandler}
                  ></input>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Perfil;
