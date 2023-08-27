import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Sidebar from "./Components/Sidebar";
import Perfil from "./Routes/Perfil";
import Buscar from "./Routes/Buscar";

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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
