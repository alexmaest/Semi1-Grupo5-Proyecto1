import React, { useState } from "react";
import PlayButton from "../../Components/PlayButton";
import { ModalBody } from "reactstrap";

function HomeSongs(props) {
  const [canciones, setCanciones] = useState(props.canciones);

  return (
    <>
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
                    <div className="col-sm-2">
                      <PlayButton id={cancion.id_song} />
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

export default HomeSongs;
