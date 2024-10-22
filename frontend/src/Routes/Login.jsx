import React, { Component } from "react";
import Brandvar from "../Components/Brandvar";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";

const api = import.meta.env.VITE_API;

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  //Manejar los campos de datos
  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const { email, password } = this.state;

    let url = `${api}/login/${email}/${password}`;

    const userdata = {
      email,
      password,
    };

    //Fetch para enviar la información

    try {
      const solicitud = await axios({
        url: url,
        method: "GET",
        headers: { "Content-Type": "application/json" },
        //body: JSON.stringify(userdata),
      });
      if (solicitud.statusText === "OK") {
        alert("Todo OK");
        const respuesta = await solicitud.data;
        sessionStorage.setItem("token", respuesta.token);
        sessionStorage.setItem("id", respuesta.id_User);
        sessionStorage.setItem("tracks",JSON.stringify([0])); 
        sessionStorage.setItem("noSong",0); 
        if (sessionStorage.getItem("id") == 1) {
          window.location.href = "/Administrador";
        } else {
          window.location.href = "/Usuario";
        }
      } else {
        try {
          const errorresponse = await solicitud.json();
          alert(errorresponse.message);
        } catch (error) {
          alert("Error obtener la respuesta");
        }
      }
    } catch (error) {
      alert("Error en el inicio de sesión, revisa los campos");
    }
  };

  render() {
    return (
      <div className="maincointainer bglogin">
        <Brandvar />
        <div className="logincointainer container-fluid d-flex justify-content-between align-items-center">
          <div className="col-md-4 offset-md-4 p-5 mainlogin">
            <h2 className="text-center mb-4 tipografia1">Iniciar Sesión</h2>
            <form className="tipografia2" onSubmit={this.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  onChange={this.handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ background: "#003d7a" }}
              >
                Ingresar
              </button>
            </form>
            <p className="text-center mt-3">
              ¿Nuevo Por Acá?{" "}
              <Link to={"/registrarse"} style={{ color: "#8E24AA" }}>
                Registrate
              </Link>
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Login;
