import React, { useState, useLayoutEffect } from "react";
import { ModalBody } from "reactstrap";
import { CgErase, CgPlayButton } from "react-icons/cg";

const api = import.meta.env.VITE_API;

export default function PlaylistView(props) {
  const [canciones, setCanciones] = useState([]);

  const [didMount, setDidMount] = useState(false);
  useLayoutEffect(() => {
    fetch(api + "/playlist/songs/" + props.playlist.Id)
      .then((response) => response.json())
      .then((data) => {
        setCanciones(data.success);
      });
    setDidMount(true);
  }, [didMount]);

  function handlerOnClick(e) {
    e.preventDefault();
    const idArray = [];
    canciones.forEach((cancion) => {
      idArray.push(cancion.Id);
    });
    sessionStorage.setItem("tracks", JSON.stringify(idArray));
    sessionStorage.setItem("noSong", 0);
  }

  function handlerRemoveSong(e) {
    e.preventDefault();

    fetch(api + "/playlist/remove/song", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body: JSON.stringify({
        Id_Playlist: props.playlist.Id,
        Id_Song: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          canciones.filter((cancion) => cancion.Id != e.target.value);
        } else alert("Error al eliminar cancion");
      });
  }

  return (
    <>
      <div className="row m-3">
        <button className="btn btn-primary col-sm-12" onClick={handlerOnClick}>
          <CgPlayButton />
        </button>
      </div>
      <ModalBody>
        <ul className="list-group">
          {canciones
            ? canciones.map((cancion) => (
                <li key={cancion.Id} className="list-group-item">
                  <div className="row m-2">
                    <div className="col-sm-2 d-flex align-items-center">
                      <img
                        src={cancion.Src_image}
                        alt=""
                        style={{ width: "50px", height: "50px" }}
                        className="rounded img-fluid"
                      ></img>
                    </div>
                    <div className="col-sm-8 d-flex align-items-center">
                      <p className="h3">{cancion.Nombre}</p>
                    </div>
                    <div className="col-sm-2 d-flex align-items-center justify-content-center">
                      <button
                        className="col-sm-12 btn btn-danger m-1"
                        type="button"
                        value={cancion.Id}
                        onClick={handlerRemoveSong}
                      >
                        <CgErase />
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
