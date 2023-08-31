import React, { Component } from "react";

class Footer extends Component {
    render() {
      return (
        <nav className="fixed-bottom bottombox d-flex align-items-center justify-content-center">
            <div className="text-center tipografia2">
              <div class="container">
                <div class="row">
                  <div class="col border-blanco">
                  2023 Spotify Pirata
                  </div>
                  <div class="col">
                  Todos los derechos resevados
                  </div>
                </div>
              </div>
            </div>
        </nav>
      );
    }
  }
  
  export default Footer;