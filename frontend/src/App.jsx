import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import SidebarAdmin from "./Components/SidebarAdmin";
import Perfil, {loader as loaderPerfil} from "./Routes/Perfil";
import Buscar from "./Routes/Buscar";
import CrearCancion, {loader as loaderCCancion} from "./Routes/Cancion/CrearCancion";
import Artistas, { loader as loaderArtista } from "./Routes/Artista/Artistas";
import CrearArtista from "./Routes/Artista/CrearArtista";
import ModificarArtista, {
  loader as LoaderMArtista,
} from "./Routes/Artista/ModificarArtista";
import Album, { loader as loaderAlbum } from "./Routes/Album/Album";
import CrearAlbum, { loader as loaderCAlbum } from "./Routes/Album/CrearAlbum";
import Login from "./Routes/Login"
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import ModificarAlbum, {loader as loaderMAlbum} from "./Routes/Album/ModificarAlbum";
import Canciones , {loader as loaderCancion} from "./Routes/Cancion/Cancion";
import ModificarCancion, {loader as loaderMCancion} from "./Routes/Cancion/ModificarCancion";
import Radio from "./Routes/Radio";
import Playlist, {loader as loaderPlaylist} from "./Routes/Playlist/Playlist";
import Favoritos from "./Routes/Favoritos";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Usuario",
      element: <Sidebar />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "",
          element: <h1>Aqui debe ir una radio</h1>,
        },
        {
          path: "Perfil",
          loader: loaderPerfil,
          element: <Perfil />,
        },
        {
          path: "Buscar",
          element: <Buscar />,
        },
        {
          path: "Favoritos",
          element: <Favoritos />,
        },
        {
          path: "Playlist",
          element: <h1>Aqui deberian ir la playlist</h1>,
        },
        {
          path: "Radio",
          element: <Radio />,
        },
      ],
    },
    {
      path: "/Administrador",
      element: <SidebarAdmin />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "Perfil",
          loader: loaderPerfil,
          element: <Perfil />,
        },
        {
          path: "Buscar",
          element: <Buscar />,
        },
        {
          path: "Buscar/Artista/:id",
          element: <Perfil />,
        },
        {
          path: "Favoritos",
          element: <Favoritos />,
        },
        {
          path: "Playlist",
          loader: loaderPlaylist,
          element: <Playlist />,
        },
        {
          path: "Artista",
          loader: loaderArtista,
          element: <Artistas />,
        },
        {
          path: "Artista/:id",
          loader: LoaderMArtista,
          element: <ModificarArtista />,
        },
        {
          path: "Artista/CrearArtista",
          element: <CrearArtista />,
        },
        {
          path: "Album",
          loader: loaderAlbum,
          element: <Album />,
        },
        {
          path: "Album/CrearAlbum",
          loader: loaderCAlbum,
          element: <CrearAlbum />,
        },
        {
          path: "Album/:id",
          loader: loaderMAlbum,
          element: <ModificarAlbum />,
        },
        {
          path: "Cancion",
          loader: loaderCancion,
          element: <Canciones />,
        },
        {
          path: "Cancion/CrearCancion",
          loader: loaderCCancion,
          element: <CrearCancion />,
        },
        {
          path: "Cancion/:id",
          loader: loaderMCancion,
          element: <ModificarCancion />,
        },
        {
          path: "Radio",
          element: <Radio />,
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
      errorElement: <h1>404 Not Found</h1>
    },
    {
      path: '/registrarse',
      element: <Register />,
      errorElement: <h1>404 Not Found</h1>
    },
    {
      path: '/',
      element: <Home />,
      errorElement: <h1>404 Not Found</h1>
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
