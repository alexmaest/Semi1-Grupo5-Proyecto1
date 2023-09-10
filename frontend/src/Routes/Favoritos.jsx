import React, { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaHeartCrack } from "react-icons/fa6";

const api = import.meta.env.VITE_API;

export default function Favoritos() {

  const [favs, setFavs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(api + "/user/favoriteSongs/" + sessionStorage.getItem("id"));
        const data = await response.json();
        setFavs(data.success);
        //console.log(data.success);
      } catch (error) {
        console.error('Error al cargar favoritos:', error);
      }
    }

    fetchData();
  }, []);

  async function updateData() {
    try {
      const response = await fetch(api + "/user/favoriteSongs/" + sessionStorage.getItem("id"));
      const data = await response.json();
      setFavs(data.success);
      //console.log(data.success);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    }
  }

  function handleButtonPLay(songId) {
    //console.log('El ID es:', songId);
    sessionStorage.setItem(
      "tracks",
      JSON.stringify([songId])
    );
    sessionStorage.setItem("noSong", 0);
  }

  function hadlerUnfavorite(userId, songId) {
    fetch(api + "/user/unlike/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        songId: songId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        updateData();
      });
  }

  return (

    <div className="maincointainer">
      <h1 className="text-center tipografia1 blanco">Favoritos</h1><h2 className="text-center tipografia2 blanco"><BsFillSuitHeartFill/></h2>
      <br/>
      <table className="favsbackground">
        <tbody>
          {favs.map((fav, index) => (
            <tr key={index}>
              <td className="margen-lista"><p className="vertical-center tipografia3-titulo">{fav.Cancion}</p><p className="vertical-center tipografia3-detalles">{fav.Artista} - {fav.Album}</p></td>
              <td className="text-center">
                <button className="transparent-button" onClick={() => handleButtonPLay(fav.Id_Cancion)}>
                <FaPlay/>
                </button>
                <button className="transparent-button" onClick={() => hadlerUnfavorite(fav.Usuario, fav.Id_Cancion)}>
                <FaHeartCrack/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
