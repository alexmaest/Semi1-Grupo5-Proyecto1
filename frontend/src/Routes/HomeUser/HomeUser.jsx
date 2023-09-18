import React, { useEffect, useState } from "react";
import { Modal } from "reactstrap";
import { CgEye } from "react-icons/cg";
import "./HomeUser.css";
import axios from "axios";
import PlayButton from "../../Components/PlayButton";
import HomeSongs from "./HomeSongs";

const api = import.meta.env.VITE_API;

function HomeUser() {
  const [Canciones, setCanciones] = useState();
  const [Artistas, setArtistas] = useState();
  const [Albumes, setAlbumes] = useState();
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState();

  async function cargarDatos() {
    await axios({ url: api + "/admin/song", method: "GET" }).then(
      (response) => {
        setCanciones(response.data.songs);
      }
    );
    await axios({ url: api + "/admin/album", method: "GET" }).then(
      (response) => {
        setAlbumes(response.data.albums);
      }
    );
    await axios({ url: api + "/admin/artist", method: "GET" }).then(
      (response) => {
        setArtistas(response.data.artists);
      }
    );
  }

  async function handlerViewModal(type, id) {
    if (type === "Artist") {
      const datos = [];
      const albums = await axios({
        url: api + "/admin/artistAlbums/" + id,
        method: "GET",
      }).then((response) => response.data.albums);

      if (albums) {
        await albums.forEach(async (album) => {
          await axios({
            url: api + "/admin/albumSongs/" + album.id_album,
            method: "GET",
          }).then((response) => {
            const temp = response.data.songs;
            datos.push(...temp);
          });
          setOpen(true);
        });
      }
      console.log(datos);
      setResult(datos);
    } else if (type === "Album") {
      const datos = await axios({
        url: api + "/admin/albumSongs/" + id,
        method: "GET",
      });
      setResult(datos.data.songs);
      setOpen(true);
    }
  }

  const viewModal = () => {
    return <HomeSongs canciones={result} />;
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="tipografia3-detalles" style={{ fontSize: "40px" }}>
          Canciones
        </h1>
        <div className="row flex-nowrap overflow-auto" id="contenedor">
          {Canciones
            ? Canciones.map((cancion) => (
                <div className="col-3" key={cancion.id_song}>
                  <div className="card border-secondary">
                    <div
                      className="card-header tipografia3-detalles"
                      style={{ fontSize: 20 }}
                    >
                      {cancion.name}
                    </div>
                    <div className="card-body">
                      <img
                        src={cancion.coverPhoto}
                        className="img-fluid rounded card-img"
                        style={{ height: "250px" }}
                        alt=""
                      />
                      <p
                        className="card-text text-center tipografia3-detalles"
                        style={{ fontSize: 30 }}
                      >
                        {cancion.duration}
                      </p>
                      <div className="d-flex justify-content-center align-items-center">
                        <PlayButton id={cancion.id_song} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <h1
          className="tipografia3-detalles"
          style={{ fontSize: "40px", paddingTop: "40px" }}
        >
          Albumes
        </h1>
        <div className="row flex-nowrap overflow-auto" id="contenedor">
          {Albumes
            ? Albumes.map((album) => (
                <div className="col-3" key={album.id_album}>
                  <div className="card border-secondary">
                    <div
                      className="card-header tipografia3-detalles"
                      style={{ fontSize: 20 }}
                    >
                      {album.name}
                    </div>
                    <div className="card-body">
                      <img
                        src={album.coverPhoto}
                        className="img-fluid rounded card-img"
                        style={{ height: "250px" }}
                        alt=""
                      />
                      <p
                        className="card-text text-center tipografia3-detalles"
                        style={{ fontSize: 30 }}
                      >
                        {album.description}
                      </p>
                      <div>
                        <button
                          className="btn btn-info col-sm-12"
                          onClick={(e) => {
                            handlerViewModal("Album", album.id_album);
                          }}
                        >
                          <CgEye />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <h1
          className="tipografia3-detalles"
          style={{ fontSize: "40px", paddingTop: "40px" }}
        >
          Artistas
        </h1>
        <div className="row flex-nowrap overflow-auto" id="contenedor">
          {Artistas
            ? Artistas.map((artista) => (
                <div className="col-3" key={artista.id_artist}>
                  <div className="card border-secondary">
                    <div
                      className="card-header tipografia3-detalles"
                      style={{ fontSize: 20 }}
                    >
                      {artista.name}
                    </div>
                    <div className="card-body">
                      <img
                        src={artista.profilePhoto}
                        className="img-fluid rounded card-img"
                        style={{ height: "250px" }}
                        alt=""
                      />
                      <p
                        className="card-text text-center tipografia3-detalles"
                        style={{ fontSize: 30 }}
                      >
                        {artista.birthday}
                      </p>
                      <div>
                        <button
                          className="btn btn-warning col-sm-12"
                          onClick={(e) => {
                            handlerViewModal("Artist", artista.id_artist);
                          }}
                        >
                          <CgEye />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
      <Modal isOpen={open} toggle={() => setOpen(false)} scrollable size="lg">
        {viewModal()}
      </Modal>
    </>
  );
}

export default HomeUser;
