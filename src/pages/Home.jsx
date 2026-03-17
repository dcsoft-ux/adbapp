import React from "react";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Panel de Administración</h1>
        <p>
          Administra empleados, habilidades y departamentos con una interfaz
          más visible, moderna y ordenada.
        </p>
      </section>

      <section className="stats">
        <div className="stat">
          <div className="stat-label">Módulo principal</div>
          <div className="stat-value">Empleados</div>
        </div>
        <div className="stat">
          <div className="stat-label">Gestión de apoyo</div>
          <div className="stat-value">Habilidades</div>
        </div>
        <div className="stat">
          <div className="stat-label">Organización</div>
          <div className="stat-value">Departamentos</div>
        </div>
      </section>
    </div>
  );
};

export default Home;