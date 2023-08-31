import React, { Component } from "react";
import ITForm from "../../Components/ITPForm";

class CrearArtista extends Component {
  state = {
    nombre: "",
    src: "",
    foto: "",
    fecha: "",
  };

  convertBase64 = (file) => {
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
  };

  changeNombre = (value) => {
    this.setState({ nombre: value });
  };

  changeFoto = (value) => {
    this.setState({ foto: value });
  };

  changeSrc = (value) => {
    this.setState({ src: value });
  };

  changeFechaNac = (value) => {
    this.setState({ fecha: value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.convertBase64(this.state.foto).then((result) => {
      fetch("http://localhost:5000/admin/artist", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.nombre,
          birthday: this.state.fecha,
          profilePhoto: result,
        }),
      }).then((response) => {
        alert(response.status);
      });
    });
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
        <div>
          <div className="row">
            <h1>Creando Artista</h1>
          </div>
          <div className="row">
            <div
              className="col-sm-4 col-md-4 rounded"
              style={{ background: "#2f2f33" }}
            >
              <img
                src={this.state.src}
                alt=""
                className="rounded mx-auto d-block img-fluid m-3"
              />
            </div>
            <div className="col-sm-8 col-md-8">
              <form>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <ITForm
                      value={"Nombre:"}
                      change={this.changeNombre}
                    />
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Fecha de Nacimiento:
                    <input
                      type="date"
                      className="form-control"
                      onChange={(e) => {
                        this.changeFechaNac(e.target.value);
                      }}
                    ></input>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <label className="form-label mt-4">Foto:</label>
                    <input
                      className="form-control"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        this.changeSrc(URL.createObjectURL(e.target.files[0]));
                        this.changeFoto(e.target.files[0]);
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
      </div>
    );
  }
}

export default CrearArtista;
