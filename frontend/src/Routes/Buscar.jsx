import React, { useState } from "react";
import { CgPlayListSearch } from "react-icons/cg";
import SearchSong from "../Components/SearchSong";
import SearchArtist from "../Components/SearchArtist";
import SearchAlbum from "../Components/SearchAlbum";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import axios from "axios";

const api = import.meta.env.VITE_API;

export default function Buscar() {
  const [checked, setChecked] = useState("cancion");
  const [search, setSearch] = useState("");
  const [datos, setDatos] = useState();
  const [open, setOpen] = useState(false);
  const [songs, setSongs] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    setDatos(
      await axios({
        url: api + "/user/search",
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          search: search,
        },
      }).then((response) => response.data)
    );
  }

  const seeList = () => {
    if (checked === "cancion" && datos) {
      return (
        <ul className="list-group">
          {datos.songs
            ? datos.songs.map((data) => (
                <li className="list-group-item" key={data.id_song}>
                  <SearchSong data={data} />
                </li>
              ))
            : null}
        </ul>
      );
    } else if (checked === "artista" && datos) {
      return (
        <ul className="list-group">
          {datos.artists
            ? datos.artists.map((data) => (
                <li className="list-group-item" key={data.id_artist}>
                  <SearchArtist
                    data={data}
                    setOpen={setOpen}
                    setSongs={setSongs}
                  />
                </li>
              ))
            : null}
        </ul>
      );
    } else if (checked === "album" && datos) {
      return (
        <ul className="list-group">
          {datos.albums
            ? datos.albums.map((data) => (
                <li className="list-group-item" key={data.id_album}>
                  <SearchAlbum
                    data={data}
                    setOpen={setOpen}
                    setSongs={setSongs}
                  />
                </li>
              ))
            : null}
        </ul>
      );
    }
    return null;
  };

  return (
    <>
      <div className="container">
        <form>
          <div className="row justify-content-md-center">
            <div className="col col-sm-8">
              <input
                className="form-control"
                type="text"
                placeholder="Buscar canciones, artistas o albumes"
                onChange={(event) => setSearch(event.target.value)}
                style={{ height: "4rem" }}
              />
            </div>
            <button
              className="btn btn-secondary col-sm-2"
              type="submit"
              onClick={handleSubmit}
            >
              <CgPlayListSearch />
            </button>
          </div>
          <div className="row justify-content-md-center">
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                name="busqueda"
                onClick={() => setChecked("cancion")}
                defaultChecked
              />
              <label className="form-check-label">Cancion</label>
            </div>
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                name="busqueda"
                onClick={() => setChecked("artista")}
              />
              <label className="form-check-label">Artista</label>
            </div>
            <div className="col col-md-2 form-check m-1">
              <input
                className="form-check-input"
                type="radio"
                name="busqueda"
                onClick={() => setChecked("album")}
              />
              <label className="form-check-label">Album</label>
            </div>
          </div>
        </form>
        <div className="container mt-5">{seeList()}</div>
      </div>
      <Modal isOpen={open} toggle={() => setOpen(false)} scrollable size="lg">
        <ModalHeader>Canciones</ModalHeader>
        <ModalBody>
          <ul className="list-group">
            {songs
              ? songs.map((data) => (
                  <li className="list-group-item" key={data.id_song}>
                    <SearchSong data={data} />
                  </li>
                ))
              : null}
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
}
