import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";

const Layout = () => {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-title">ADB App</span>
            <span className="brand-subtitle">
              Gestión de empleados, habilidades y departamentos
            </span>
          </div>
          <Menu />
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;