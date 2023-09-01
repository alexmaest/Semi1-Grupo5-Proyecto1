import React, { Component } from "react";
import { Link } from 'react-router-dom';

class Brandvar extends Component {
    render() {
      return (
        <nav className="navbar blackbox">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link to={"/"} className="textbrand" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="https://i.imgur.com/2172Pyb.png" alt="Logo" width="50" height="50" style={{ marginRight: '10px' }}/>   
                    Spotify Pirata
                </Link>
                <div>
                    <Link to={"/login"} className="options">
                        Iniciar sesión
                    </Link>
                    <Link to={"/registrarse"} className="options">
                        Registrarse
                    </Link>
                </div>
            </div>
        </nav>
      );
    }
  }
  
  export default Brandvar;