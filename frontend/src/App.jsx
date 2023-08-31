import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import SidebarAdmin from "./Components/SidebarAdmin";
import Perfil from "./Routes/Perfil";
import Buscar from "./Routes/Buscar";
import CrearCancion from "./Routes/CrearCancion";
import Artistas, { loader as loaderArtista } from "./Routes/Artista/Artistas";
import CrearArtista from "./Routes/Artista/CrearArtista";
import ModificarArtista, {
  loader as LoaderModificarA,
} from "./Routes/Artista/ModificarArtista";
import Album, { loader as loaderAlbum } from "./Routes/Album/Album";
import CrearAlbum, { loader as loaderCAlbum } from "./Routes/Album/CrearAlbum";

function App() {
  const router = createBrowserRouter([
    {
      path: "/Usuario",
      element: <Sidebar />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "Perfil",
          element: <Perfil />,
        },
        {
          path: "Buscar",
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
    {
      path: "/Administrador",
      element: <SidebarAdmin />,
      errorElement: <h1>404 Not Found</h1>,
      children: [
        {
          path: "Perfil",
          element: <Perfil />,
        },
        {
          path: "Buscar",
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
        {
          path: "Cancion",
          element: <CrearCancion />,
        },
        {
          path: "Artista",
          loader: loaderArtista,
          element: <Artistas />,
        },
        {
          path: "Artista/:id",
          loader: LoaderModificarA,
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
