import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  const getClassName = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="nav">
      <NavLink to="/" className={getClassName}>
        Inicio
      </NavLink>
      <NavLink to="/empleados" className={getClassName}>
        Empleados
      </NavLink>
      <NavLink to="/habilidades" className={getClassName}>
        Habilidades
      </NavLink>
      <NavLink to="/departamentos" className={getClassName}>
        Departamentos
      </NavLink>
    </nav>
  );
};

export default Menu;