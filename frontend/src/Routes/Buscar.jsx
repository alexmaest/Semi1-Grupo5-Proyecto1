import React, { Component } from "react";
import { CgPlayListSearch } from "react-icons/cg";

class Buscar extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <form>
          <div className="row justify-content-md-center">
            <div className="col col-sm-8">
              <input
                className="form-control"
                type="search"
                placeholder="Buscar canciones, artistas o albumes"
                style={{ height: "4rem" }}
              />
            </div>
            <button className="btn btn-secondary col-sm-2" type="submit">
              <CgPlayListSearch />
            </button>
          </div>
          <div className="row justify-content-md-center">
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                value="cancion"
                name="busqueda"
                defaultChecked
              />
              <label className="form-check-label">Cancion</label>
            </div>
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                value="atista"
                name="busqueda"
              />
              <label className="form-check-label">Artista</label>
            </div>
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                value="album"
                name="busqueda"
              />
              <label className="form-check-label">Album</label>
            </div>
          </div>
        </form>
        <div className="container m-3">
          <ul className="list-group">
            <li className="list-group-item">
                <div className="row">
                  <div className="col-sm-2 d-flex align-items-center">
                    <img
                      src="https://i.pinimg.com/1200x/c5/eb/f2/c5ebf2e0bb30390ba534e8fe30884ec8.jpg"
                      alt=""
                      style={{ width: "50px", height: "50px" }}
                      className="rounded img-fluid m-3"
                    ></img>
                  </div>
                  <div className="col-sm-7 d-flex align-items-center">
                    <p className="h3">Probando</p>
                  </div>
                  <div className="col-sm-2 d-flex align-items-center">
                    <button className="btn btn-secondary m-1" type="button">
                      Reproducir
                    </button>
                    <button className="btn btn-secondary m-1" type="button">
                      Playlist
                    </button>
                  </div>
                </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Buscar;
