import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { CgOptions, CgErase, CgPlayList, CgPlayListAdd } from "react-icons/cg";
import { BsPlusLg } from "react-icons/bs";
import { Button, Modal } from "reactstrap";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistView from "./PlaylistView";
import PlaylistCreate from "./PlaylistCreate";
import PlaylistUpdate from "./PlaylistUpdate";

const api = import.meta.env.VITE_API;

export async function loader() {
  const canciones = await fetch(
    api + "/playlist/usuario/" + sessionStorage.getItem("id")
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return canciones;
}

export default function Playlist() {
  const datos = useLoaderData();
  const [open, setOpen] = useState(false);
  const [playlists, setPlaylist] = useState(datos.success);
  const [type, setType] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState();

  function handlerViewModal(param, type) {
    setCurrentPlaylist(param);
    setType(type);
    setOpen(true);
  }

  const viewModal = () => {
    if (type === "Add") {
      return <PlaylistAdd playlist={currentPlaylist} />;
    } else if (type === "View") {
      return <PlaylistView playlist={currentPlaylist} />;
    } else if (type === "Create") {
      return <PlaylistCreate />;
    } else if (type === "Update") {
      return <PlaylistUpdate playlist={currentPlaylist} />;
    }
    return null;
  };

  const handlerErrasePlaylist = (e) => {
    e.preventDefault();
    const id = e.target.value;
    fetch(api + "/playlist/" + id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setPlaylist(playlists.filter((playlist) => playlist.Id != id));
        } else alert("Error al eliminar playlist");
      });
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-md-center">
          <Button
            color="success"
            className="col-sm-10 m-1 d-flex align-items-center justify-content-center text-decoration-none"
            style={{ height: "50px" }}
            onClick={(e) => handlerViewModal(null, "Create")}
          >
            <BsPlusLg />
          </Button>
        </div>
        <div
          className="container mt-5"
          style={{ maxHeight: "900px", overflowY: "auto" }}
        >
          <div className="row">
            {playlists
              ? playlists.map((playlist) => (
                  <div className="col-sm-3" key={playlist.Id}>
                    <div className="card m-2">
                      <div className="card-body">
                        <h5 className="card-title">{playlist.Nombre}</h5>
                        <div style={{ height: "200px" }}>
                          <img
                            src={playlist.Src}
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                        <p className="card-text">{playlist.Descripcion}</p>
                        <button
                          className="btn btn-info"
                          onClick={(e) => handlerViewModal(playlist, "View")}
                        >
                          <CgPlayList />
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={(e) => handlerViewModal(playlist, "Add")}
                        >
                          <CgPlayListAdd />
                        </button>
                        <button
                          className="btn btn-warning"
                          onClick={(e) => handlerViewModal(playlist, "Update")}
                        >
                          <CgOptions />
                        </button>
                        <button
                          className="btn btn-danger"
                          value={playlist.Id}
                          onClick={(e) => handlerErrasePlaylist(e)}
                        >
                          <CgErase />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      <Modal isOpen={open} toggle={() => setOpen(false)} scrollable size="lg">
        {viewModal()}
      </Modal>
    </>
  );
}
