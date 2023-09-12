import { useLoaderData } from "react-router-dom";
import {
  CgPlayListSearch,
  CgOptions,
  CgErase,
  CgEye,
  CgAdd,
} from "react-icons/cg";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import React, { useState } from "react";

const api = import.meta.env.VITE_API;

export async function loader() {
  const album = await fetch(api + "/admin/album/")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });

  return album;
}

export default function Album() {
  const datos = useLoaderData();
  const [album, setAlbum] = useState(datos.albums);
  const [buscar, setBuscar] = useState(0);
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [isView, setIsView] = useState(false);
  const [currentAlbum, setCurrentAlbum] = useState();

  function handlerEliminar(param) {
    let password = prompt("Ingrese su password:", "");
    if (password == null || password == "") {
      alert("Password incorrecto");
    } else {
      fetch(api + "/admin/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == true) {
            fetch(api + "/admin/album/" + param, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                alert(data.message);
                window.location.reload();
              });
          } else {
            alert("Password incorrecto");
          }
        });
    }
  }

  function handlerBuscar(e) {
    e.preventDefault();

    if (buscar === "") {
      fetch(api + "/admin/album/")
        .then((response) => response.json())
        .then((data) => {
          setAlbum(data.albums);
        });
      return;
    }
    fetch(api + "/admin/album/" + buscar)
      .then((response) => response.json())
      .then((data) => {
        if (data.album != null) {
          setAlbum([data.album]);
        } else {
          setAlbum([]);
        }
      });
  }

  function handlerErraseSong(e) {
    e.preventDefault();
    fetch(api + "/admin/album/song/" + e.target.value, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.reload();
      });
  }

  function handlerAddSong(e) {
    e.preventDefault();
    fetch(api + "/admin/album/song", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        idAlbum: currentAlbum.id_album,
        idSong: e.target.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.reload();
      });
  }

  function modalView(datos, isView) {
    setIsView(isView);
    setCurrentAlbum(datos);
    if (isView) {
      fetch(api + "/admin/albumSongs/" + datos.id_album)
        .then((response) => response.json())
        .then((data) => {
          setSongs(data.songs);
          setTitle(datos.name);
          setOpen(true);
        });
      return;
    }
    fetch(api + "/admin/availableSongs/" + datos.artistId)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSongs(data.songs);
        setTitle("Canciones disponibles");
        setOpen(true);
      });
  }

  return (
    <>
      <div className="container">
        <form>
          <div className="row justify-content-md-center">
            <div className="col col-sm-8">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar ID Album"
                onChange={(e) => {
                  setBuscar(e.target.value);
                }}
                style={{ height: "4rem" }}
              />
            </div>
            <button
              className="btn btn-secondary col-sm-1 m-1"
              onClick={handlerBuscar}
            >
              <CgPlayListSearch />
            </button>
            <Link
              to="CrearAlbum"
              className="btn btn-primary col-sm-1 m-1 d-flex align-items-center justify-content-center text-decoration-none"
            >
              <BsPlusLg />
            </Link>
          </div>
        </form>
        <div
          className="container mt-5"
          style={{ maxHeight: "900px", overflowY: "auto" }}
        >
          <ul className="list-group">
            {album.length > 0
              ? album.map((album) => (
                  <li key={album.id_album} className="list-group-item">
                    <div className="row m-2">
                      <div className="col-sm-1 d-flex align-items-center">
                        <img
                          src={album.coverPhoto}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded img-fluid"
                        ></img>
                      </div>
                      <div className="col-sm-8 d-flex align-items-center">
                        <p className="h3">
                          {album.name}
                          <br />
                          <small className="text-muted">
                            {"ID: " +
                              album.id_album +
                              " - " +
                              album.description}
                          </small>
                        </p>
                      </div>
                      <div className="col-sm-3 d-flex align-items-center justify-content-center">
                        <button
                          className="col-sm-3 btn btn-info m-1"
                          type="button"
                          onClick={() => {
                            modalView(album, true);
                          }}
                        >
                          <CgEye />
                        </button>
                        <button
                          className="col-sm-3 btn btn-success m-1"
                          type="button"
                          onClick={() => {
                            modalView(album, false);
                          }}
                        >
                          <CgAdd />
                        </button>
                        <Link
                          to={`${album.id_album}`}
                          className="col-sm-3 btn btn-warning m-1"
                          type="button"
                        >
                          <CgOptions />
                        </Link>
                        <button
                          className="col-sm-3 btn btn-danger m-1"
                          type="button"
                          value={album.id_album}
                          onClick={(e) => {
                            handlerEliminar(e.target.value);
                          }}
                        >
                          <CgErase />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>

      <Modal isOpen={open} toggle={() => setOpen(false)} scrollable size="lg">
        <ModalHeader>
          <p className="h2">{title}</p>
        </ModalHeader>
        <ModalBody>
          <ul className="list-group">
            {songs.length
              ? songs.map((song) => (
                  <li key={song.id_song} className="list-group-item">
                    <div className="row m-2">
                      <div className="col-sm-1 d-flex align-items-center">
                        <img
                          src={song.coverPhoto}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                          className="rounded img-fluid"
                        ></img>
                      </div>
                      <div className="col-sm-8 d-flex align-items-center">
                        <p className="h3">
                          {song.name}
                          <br />
                          <small className="text-muted">
                            {"ID: " + song.id_song}
                          </small>
                        </p>
                      </div>
                      <div className="col-sm-3 d-flex align-items-center justify-content-center">
                        <button
                          className={`col-sm-12 btn btn-${
                            isView == true ? "danger" : "success"
                          } m-1`}
                          type="button"
                          value={song.id_song}
                          onClick={
                            isView == true ? handlerErraseSong : handlerAddSong
                          }
                        >
                          {isView == true ? <CgErase /> : <CgAdd />}
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              : null}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
}
