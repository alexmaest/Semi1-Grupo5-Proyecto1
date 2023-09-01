import React, { Component } from "react";
import ITForm from "../Components/ITPForm";

class crearCancion extends Component {
  state = {
    nombre: "",
    foto: "",
    duracion: 0,
    artista: "",
    song: "",
  };

  changeNombre = (value) => {
    this.setState({ nombre: value });
  };

  changeFoto = (value) => {
    this.setState({ foto: value });
  };

  changeDuracion = (value) => {
    this.setState({ duracion: value });
  };

  changeArtista = (value) => {
    this.setState({ artista: value });
  };

  changeArchivo = (value) => {
    this.setState({ song: value });
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
              src={this.state.foto}
              alt=""
              className="rounded mx-auto d-block img-fluid m-3"
            />
          </div>
          <div className="col-sm-8 col-md-8">
            <form>
              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <ITForm value={"Nombre: "} change={this.changeNombre} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <ITForm value={"Duracion: "} change={this.changeDuracion} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <ITForm value={"Artista: "} change={this.changeArtista} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <label className="form-label mt-4">Foto: </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      this.changeFoto(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <label className="form-label mt-4">Cancion: </label>
                  <input
                    className="form-control"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      this.changeArchivo(URL.createObjectURL(e.target.files[0]));
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

export default crearCancion;
