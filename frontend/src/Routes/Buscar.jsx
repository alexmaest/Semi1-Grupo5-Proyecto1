import React, { Component } from "react";
import { CgPlayListSearch } from "react-icons/cg";

class Buscar extends Component {
  state = {};
  render() {
    return (
      <>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-lg-6">
              <form className="d-flex">
                <input
                  className="form-control me-sm-2"
                  type="search"
                  placeholder="Buscar canciones, artistas o albumes"
                  style={{ height: "4rem" }}
                />
                <button
                  className="btn btn-secondary my-2 my-sm-0"
                  type="submit"
                >
                  <CgPlayListSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Buscar;
