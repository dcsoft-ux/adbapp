import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./styles/main.scss";
import { setRuntimeConfig } from "./config/runtimeConfig";

const bootstrap = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8001/api/configuracion/");
    const data = await response.json();

    setRuntimeConfig({
      API_BASE_URL: data.API_BASE_URL || "http://127.0.0.1:8001/api",
    });
  } catch (error) {
    console.error("No se pudo cargar la configuración remota", error);
    setRuntimeConfig({
      API_BASE_URL: "http://127.0.0.1:8001/api",
    });
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

bootstrap();