import React, { Component } from "react";
import ITForm from "../Components/ITPForm";

class Perfil extends Component {
  state = {
    nombre: "Bruse",
    apellido: "Wayne",
    correo: "brucewayne@batman.com",
    fechaNacimiento: "1990-01-01",
    fotoPerfil: "https://i.pinimg.com/1200x/c5/eb/f2/c5ebf2e0bb30390ba534e8fe30884ec8.jpg",
  };

  render() {
    return (
      <div className="container">
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
                  <ITForm value={this.state.nombre} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Apellidos:
                  <ITForm value={this.state.apellido} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Correo:
                  <ITForm value={this.state.correo} />
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Nueva Contraseña:
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <input type="password" className="form-control" placeholder="New Password"></input>
                    </div>
                    <div className="col-sm-6">
                      <input type="password" className="form-control" placeholder="Verify Password"></input>
                    </div>
                  </div>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Fecha de Nacimiento: {this.state.fechaNacimiento}
                  <input type="date" className="form-control"></input>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    <label className="form-label mt-4">
                        Cambiar Foto de Perfil:
                    </label>
                    <input className="form-control" type="file" accept="image/png, image/jpeg" onChange={(e) => { this.setState({fotoPerfil:URL.createObjectURL(e.target.files[0])}) }}/>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <input type="submit" className="btn btn-primary" value="Guardar Cambios"></input>
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
