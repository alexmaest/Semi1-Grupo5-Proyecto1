import React, { Component } from "react";
import Brandvar from "../Components/Brandvar";
import { Link } from 'react-router-dom';
import Footer from "../Components/Footer";

class Login extends Component {

    state = {
      email: "",
      password: ""
    };

    //Manejar los campos de datos
    handleChange = (event) => {
      const { id, value } = event.target;
      this.setState({ [id]: value });
    };

    handleSubmit = async (event) => {
      event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
      
      const { email, password} = this.state;
    
      let url = "http://localhost:5000/login"

      const userdata = {
          email,
          password
      };

      //Fetch para enviar la información

      try {
          const solicitud = await fetch(url,{
                  method: "POST",
                  headers: {"Content-Type": "application/json",},
                  body: JSON.stringify(userdata),
              });
          if (!solicitud.ok){
              alert("Error en la solicitud, servidor")
          }
      } catch (error) {
          alert("Error en el inicio de sesión, revisa los campos")
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
                        <label htmlFor="email" className="form-label">Correo</label>
                        <input type="text" className="form-control" id="email" onChange={this.handleChange} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                      </div>
                      <button type="submit" className="btn btn-primary w-100" style={{background: '#003d7a'}}>Ingresar</button>
                    </form>
                    <p className="text-center mt-3">¿Nuevo Por Acá? <Link to={"/registrarse"} style={{color: '#8E24AA'}}>
                          Registrate
                      </Link></p>
                  </div>
                </div>
                <Footer />
          </div>
      );
    }
  }

export default Login;
