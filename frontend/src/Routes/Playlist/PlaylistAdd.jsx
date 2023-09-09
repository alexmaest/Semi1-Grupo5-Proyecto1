import React, { useState, useLayoutEffect } from "react";
import { ModalBody } from "reactstrap";
import { CgAdd, CgPlayListSearch } from "react-icons/cg";

const api = import.meta.env.VITE_API;

export default function PlaylistAdd(props) {
  const [buscar, setBuscar] = useState("");
  const [canciones, setCanciones] = useState([]);

  const [didMount, setDidMount] = useState(false);
  useLayoutEffect(() => {
    fetch(api + "/admin/song")
      .then((response) => response.json())
      .then((data) => {
        setCanciones(data.songs);
      });
    setDidMount(true);
  }, [didMount]);

  function handlerOnClick(e) {
    e.preventDefault();

    fetch(api + "/user/search", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        search: buscar,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCanciones(data.songs);
      });
  }

  function handlerAddSong(e) {
    e.preventDefault();

    fetch(api + "/playlist/addSong", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        Id_Playlist: props.playlist.Id,
        Id_Song: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) alert("Cancion agregada con exito");
        else alert("Error al agregar cancion");
      });
  }

  return (
    <>
      <form>
        <div className="row m-3">
          <div className="col-sm-10">
            <input
              className="form-control"
              type="text"
              placeholder="Buscar Canciones"
              onChange={(e) => {
                setBuscar(e.target.value);
              }}
              style={{ height: "3rem" }}
            />
          </div>
          <button className="btn btn-primary col-sm-2" onClick={handlerOnClick}>
            <CgPlayListSearch />
          </button>
        </div>
      </form>
      <ModalBody>
        <ul className="list-group">
          {canciones
            ? canciones.map((cancion) => (
                <li key={cancion.id_song} className="list-group-item">
                  <div className="row m-2">
                    <div className="col-sm-2 d-flex align-items-center">
                      <img
                        src={cancion.coverPhoto}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded img-fluid"
                      ></img>
                    </div>
                    <div className="col-sm-8 d-flex align-items-center">
                      <p className="h3">{cancion.name}</p>
                    </div>
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                      <button
                        className="col-sm-12 btn btn-success m-1"
                        type="button"
                        value={cancion.id_song}
                        onClick={handlerAddSong}
                      >
                        <CgAdd />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            : null}
        </ul>
      </ModalBody>
    </>
  );
}
