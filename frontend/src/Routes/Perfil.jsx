import React, { Component } from "react";
import ITForm from "../Components/ITPForm";

class Perfil extends Component {
  state = {
    nombre: "Bruse",
    apellido: "Wayne",
    correo: "brucewayne@batman.com",
    fechaNacimiento: "1990-01-01",
    psw: "",
    confirmPsw: "",
    fotoPerfil:
      "https://i.pinimg.com/1200x/c5/eb/f2/c5ebf2e0bb30390ba534e8fe30884ec8.jpg",
  };

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

    if(this.state.psw === this.state.confirmPsw && this.state.psw != ""){
      alert("Datos Actualizados");
    }else{
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
            <p className="h3 text-center">ID: 12345678</p>
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
                    accept="image/png, image/jpeg"
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
