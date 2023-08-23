import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Perfil from "./Routes/Perfil";
import Buscar from "./Routes/Buscar";

function App() {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [playlist, setPlaylist] = useState([
    {
      src: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
      title: "Madza - Chords of Life",
      tags: ["house"],
    },
    {
      src: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
      title: "Madza - Late Night Drive",
      tags: ["dnb"],
    },
    {
      src: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
      title: "Madza - Persistence",
      tags: ["dubstep"],
    },
  ]);

  const nextSong = () => {
    setCurrentTrack((currentTrack + 1) % playlist.length);
  };

  const previousSong = () => {
    setCurrentTrack(currentTrack > 0 ? currentTrack - 1 : 0);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Sidebar
          nextSong={nextSong}
          previousSong={previousSong}
          currentTrack={currentTrack}
          playlist={playlist}
        />
      ),
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "Perfil",
          element: <Perfil />,
        },
        {
          path: "",
          element: <Buscar />,
        },
        {
          path: "Favoritos",
          element: <h1>Aqui deberian ir los favoritos</h1>,
        },
        {
          path: "Playlist",
          element: <h1>Aqui deberian ir la playlist</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
