import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import SidebarAdmin from "./Components/SidebarAdmin";
import Perfil, { loader as loaderPerfil } from "./Routes/Perfil";
import Buscar from "./Routes/Buscar";
import CrearCancion, {
  loader as loaderCCancion,
} from "./Routes/Cancion/CrearCancion";
import Artistas, { loader as loaderArtista } from "./Routes/Artista/Artistas";
import CrearArtista from "./Routes/Artista/CrearArtista";
import ModificarArtista, {
  loader as LoaderMArtista,
} from "./Routes/Artista/ModificarArtista";
import Album, { loader as loaderAlbum } from "./Routes/Album/Album";
import CrearAlbum, { loader as loaderCAlbum } from "./Routes/Album/CrearAlbum";
import Login from "./Routes/Login";
import Home from "./Routes/Home";
import Register from "./Routes/Register";
import ModificarAlbum, {
  loader as loaderMAlbum,
} from "./Routes/Album/ModificarAlbum";
import Canciones, { loader as loaderCancion } from "./Routes/Cancion/Cancion";
import ModificarCancion, {
  loader as loaderMCancion,
} from "./Routes/Cancion/ModificarCancion";
import Radio from "./Routes/Radio";
import Playlist, { loader as loaderPlaylist } from "./Routes/Playlist/Playlist";
import Favoritos from "./Routes/Favoritos";
import HomeUser from "./Routes/HomeUser/HomeUser";
import Historico from "./Routes/Historico/Historico";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Usuario",
      element: <Sidebar />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "",
          element: <HomeUser />,
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
          loader: loaderPlaylist,
          element: <Playlist />,
        },
        {
          path: "Radio",
          element: <Radio />,
        },
        {
          path: "Historico",
          element: <Historico />,
        }
      ],
    },
    {
      path: "/Administrador",
      element: <SidebarAdmin />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "",
          element: <HomeUser />,
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
        {
          path: "Historico",
          element: <Historico />,
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <h1>404 Not Found</h1>,
    },
    {
      path: "/registrarse",
      element: <Register />,
      errorElement: <h1>404 Not Found</h1>,
    },
    {
      path: "/",
      element: <Home />,
      errorElement: <h1>404 Not Found</h1>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
