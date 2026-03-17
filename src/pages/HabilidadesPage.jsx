import React, { useEffect, useState } from "react";
import {
  listarHabilidades,
  crearHabilidad,
  actualizarHabilidad,
  eliminarHabilidad,
} from "../api/habilidades";

const HabilidadesPage = () => {
  const [habilidades, setHabilidades] = useState([]);
  const [habilidad, setHabilidad] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await listarHabilidades();
      setHabilidades(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando habilidades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const resetForm = () => {
    setHabilidad("");
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await actualizarHabilidad(editId, { habilidad });
      } else {
        await crearHabilidad({ habilidad });
      }
      resetForm();
      cargar();
    } catch (error) {
      console.error(error);
      alert("Error guardando habilidad");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setHabilidad(item.habilidad);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar habilidad?")) return;

    try {
      await eliminarHabilidad(id);
      cargar();
    } catch (error) {
      console.error(error);
      alert("Error eliminando habilidad");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Habilidades</h1>
        <p className="page-subtitle">
          Gestiona las habilidades disponibles dentro del sistema.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title">
            {editId ? "Editar habilidad" : "Nueva habilidad"}
          </h2>
          <p className="card-subtitle">
            Escribe el nombre de la habilidad y guárdala.
          </p>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Nombre de la habilidad"
              value={habilidad}
              onChange={(e) => setHabilidad(e.target.value)}
              required
            />

            <div className="button-row">
              <button className="btn btn-success" type="submit">
                {editId ? "Actualizar" : "Crear"}
              </button>

              {editId && (
                <button className="btn btn-secondary" type="button" onClick={resetForm}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card">
          <h2 className="card-title">Listado de habilidades</h2>
          <p className="card-subtitle">Total registradas: {habilidades.length}</p>

          {loading ? (
            <div className="empty">Cargando habilidades...</div>
          ) : habilidades.length === 0 ? (
            <div className="empty">No hay habilidades registradas.</div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Habilidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {habilidades.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.habilidad}</td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => handleEdit(item)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => handleDelete(item.id)}
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HabilidadesPage;