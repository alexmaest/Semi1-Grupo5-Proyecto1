import React, { Component } from "react";
import ITForm from "../Components/ITPForm";

class Perfil extends Component {
  render() {
    return (
      <div>
        <h1>Perfil</h1>
        <div
          className="htmlForm-group"
        >
          <ITForm label="Nombre" value="Estuardo Son"/>
        </div>
      </div>
    );
  }
}

export default Perfil;
