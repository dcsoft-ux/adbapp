// LIBRERIAS DE REACT
import React from "react";
import { createBrowserRouter } from "react-router-dom";
// PÁGINAS
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Crear from "../pages/Crear";
import Mostrar from "../pages/Mostrar";
import Eliminar from "../pages/Eliminar";
import Actualizar from "../pages/Actualizar";
// COMPONENTE BASE
import Layout from "../layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        errorElement: <NotFound></NotFound>,
        children: [
          {
            path: "/",
            element: <Home></Home>
          },
          {
            path: "/Crear",
            element: <Crear></Crear>
          },
          {
            path: "/Mostrar",
            element: <Mostrar></Mostrar>
          },
          {
            path: "/Eliminar",
            element: <Eliminar></Eliminar>
          },
          {
            path: "/Actualizar",
            element: <Actualizar></Actualizar>
          },
        ]
      }
    ]
  }
]);

export default router;