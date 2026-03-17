import React from "react";
import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>404</h1>
      <p>Página no encontrada.</p>
      <p>{error?.statusText || error?.message}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
};

export default NotFound;