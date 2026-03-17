import React, { useEffect, useState } from "react";
import {
  listarDepartamentos,
  crearDepartamento,
  actualizarDepartamento,
  eliminarDepartamento,
} from "../api/departamentos";

const initialForm = {
  nombreDepartamento: "",
  siglaDepartamento: "",
  activoDepartamento: true,
};

const DepartamentosPage = () => {
  const [departamentos, setDepartamentos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await listarDepartamentos();
      setDepartamentos(data);
    } catch (error) {
      console.error(error);
      alert("Error cargando departamentos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await actualizarDepartamento(editId, form);
      } else {
        await crearDepartamento(form);
      }
      resetForm();
      cargar();
    } catch (error) {
      console.error(error);
      alert("Error guardando departamento");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      nombreDepartamento: item.nombreDepartamento,
      siglaDepartamento: item.siglaDepartamento,
      activoDepartamento: item.activoDepartamento,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar departamento?")) return;

    try {
      await eliminarDepartamento(id);
      cargar();
    } catch (error) {
      console.error(error);
      alert("Error eliminando departamento");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Departamentos</h1>
        <p className="page-subtitle">
          Administra las áreas de la organización y su estado.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title">
            {editId ? "Editar departamento" : "Nuevo departamento"}
          </h2>
          <p className="card-subtitle">
            Diligencia la información del departamento.
          </p>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              className="input"
              name="nombreDepartamento"
              placeholder="Nombre"
              value={form.nombreDepartamento}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="siglaDepartamento"
              placeholder="Sigla"
              value={form.siglaDepartamento}
              onChange={handleChange}
              required
              maxLength={2}
            />

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="activoDepartamento"
                checked={form.activoDepartamento}
                onChange={handleChange}
              />
              Activo
            </label>

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
          <h2 className="card-title">Listado de departamentos</h2>
          <p className="card-subtitle">Total registrados: {departamentos.length}</p>

          {loading ? (
            <div className="empty">Cargando departamentos...</div>
          ) : departamentos.length === 0 ? (
            <div className="empty">No hay departamentos registrados.</div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Sigla</th>
                    <th>Activo</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {departamentos.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.nombreDepartamento}</td>
                      <td>{item.siglaDepartamento}</td>
                      <td>
                        <span className="badge">
                          {item.activoDepartamento ? "Sí" : "No"}
                        </span>
                      </td>
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

export default DepartamentosPage;