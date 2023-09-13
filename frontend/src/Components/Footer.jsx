import React, { Component } from "react";

class Footer extends Component {
    render() {
      return (
        <nav className="fixed-bottom bottombox d-flex align-items-center justify-content-center">
            <div className="text-center tipografia2">
              <div className="container">
                <div className="row">
                  <div className="col border-blanco">
                  2023 SemiSpotify
                  </div>
                  <div className="col">
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