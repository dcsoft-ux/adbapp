import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import EmpleadosPage from "../pages/EmpleadosPage";
import HabilidadesPage from "../pages/HabilidadesPage";
import DepartamentosPage from "../pages/DepartamentosPage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "empleados", element: <EmpleadosPage /> },
      { path: "habilidades", element: <HabilidadesPage /> },
      { path: "departamentos", element: <DepartamentosPage /> },
    ],
  },
]);

export default router;