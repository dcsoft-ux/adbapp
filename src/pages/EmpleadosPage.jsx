import React, { useEffect, useMemo, useState } from "react";
import {
  listarEmpleados,
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
} from "../api/empleados";
import { listarHabilidades } from "../api/habilidades";
import { listarDepartamentos } from "../api/departamentos";
import api from "../api/client";

const initialForm = {
  nombres: "",
  apellidos: "",
  hv: "",
  avatar: null,
  trabajo: "",
  departamento: "",
  habilidades: [],
};

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [trabajos, setTrabajos] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const cargarTodo = async () => {
    setLoading(true);
    try {
      const [empleadosData, habilidadesData, departamentosData, trabajosData] =
        await Promise.all([
          listarEmpleados(),
          listarHabilidades(),
          listarDepartamentos(),
          api.get("/trabajos/").then((r) => r.data),
        ]);

      setEmpleados(empleadosData);
      setHabilidades(habilidadesData);
      setDepartamentos(departamentosData);
      setTrabajos(trabajosData);
    } catch (error) {
      console.error(error);
      alert("Error cargando datos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  const habilidadesMap = useMemo(() => {
    return Object.fromEntries(habilidades.map((item) => [item.id, item.habilidad]));
  }, [habilidades]);

  const departamentosMap = useMemo(() => {
    return Object.fromEntries(
      departamentos.map((item) => [item.id, item.nombreDepartamento])
    );
  }, [departamentos]);

  const trabajosMap = useMemo(() => {
    return Object.fromEntries(trabajos.map((item) => [item.id, item.nombreTrabajo]));
  }, [trabajos]);

  const getMediaUrl = (value) => {
    if (!value) return "";
    if (value.startsWith("http")) return value;
    return `http://127.0.0.1:8001${value}`;
  };

  const handleChange = (e) => {
    const { name, value, selectedOptions, files, type } = e.target;

    if (name === "habilidades") {
      const selected = Array.from(selectedOptions, (option) => Number(option.value));
      setForm((prev) => ({ ...prev, habilidades: selected }));
      return;
    }

    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        [name]: files && files[0] ? files[0] : null,
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: ["trabajo", "departamento"].includes(name)
        ? value === ""
          ? ""
          : Number(value)
        : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);

    const input = document.getElementById("avatar");
    if (input) input.value = "";
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("nombres", form.nombres);
    formData.append("apellidos", form.apellidos);
    formData.append("hv", form.hv);
    formData.append("trabajo", String(form.trabajo));
    formData.append("departamento", String(form.departamento));

    form.habilidades.forEach((id) => {
      formData.append("habilidades", String(id));
    });

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = buildFormData();

      if (editId) {
        await actualizarEmpleado(editId, formData);
      } else {
        await crearEmpleado(formData);
      }

      resetForm();
      cargarTodo();
    } catch (error) {
      console.error(error);
      alert("Error guardando empleado");
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      nombres: item.nombres || "",
      apellidos: item.apellidos || "",
      hv: item.hv || "",
      avatar: null,
      trabajo: item.trabajo || "",
      departamento: item.departamento || "",
      habilidades: item.habilidades || [],
    });

    const input = document.getElementById("avatar");
    if (input) input.value = "";

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar empleado?")) return;

    try {
      await eliminarEmpleado(id);
      cargarTodo();
    } catch (error) {
      console.error(error);
      alert("Error eliminando empleado");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Empleados</h1>
        <p className="page-subtitle">
          Crea, edita y elimina empleados desde un panel más claro y ordenado.
        </p>
      </div>

      <div className="grid-2">
        <section className="card">
          <h2 className="card-title">
            {editId ? "Editar empleado" : "Nuevo empleado"}
          </h2>
          <p className="card-subtitle">
            Completa la información y guarda los cambios.
          </p>

          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              className="input"
              name="nombres"
              placeholder="Nombres"
              value={form.nombres}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="apellidos"
              placeholder="Apellidos"
              value={form.apellidos}
              onChange={handleChange}
              required
            />

            <input
              className="input"
              name="hv"
              placeholder="HV"
              value={form.hv}
              onChange={handleChange}
              required
            />

            <div className="form-group">
              <label className="input-label" htmlFor="avatar">
                Avatar
              </label>
              <input
                className="input"
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <select
              className="select"
              name="trabajo"
              value={form.trabajo}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione trabajo</option>
              {trabajos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombreTrabajo}
                </option>
              ))}
            </select>

            <select
              className="select"
              name="departamento"
              value={form.departamento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione departamento</option>
              {departamentos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombreDepartamento}
                </option>
              ))}
            </select>

            <select
              className="select"
              name="habilidades"
              multiple
              value={form.habilidades.map(String)}
              onChange={handleChange}
              size={6}
            >
              {habilidades.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.habilidad}
                </option>
              ))}
            </select>

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
          <h2 className="card-title">Listado de empleados</h2>
          <p className="card-subtitle">Total registrados: {empleados.length}</p>

          {loading ? (
            <div className="empty">Cargando empleados...</div>
          ) : empleados.length === 0 ? (
            <div className="empty">No hay empleados registrados.</div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>Trabajo</th>
                    <th>Departamento</th>
                    <th>HV</th>
                    <th>Habilidades</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {item.avatar ? (
                          <img
                            src={getMediaUrl(item.avatar)}
                            alt={item.nombres}
                            style={{
                              width: "56px",
                              height: "56px",
                              objectFit: "cover",
                              borderRadius: "12px",
                              border: "1px solid rgba(255,255,255,0.12)",
                            }}
                          />
                        ) : (
                          <span className="badge">Sin avatar</span>
                        )}
                      </td>
                      <td>{item.nombres}</td>
                      <td>{item.apellidos}</td>
                      <td>{trabajosMap[item.trabajo] || item.trabajo}</td>
                      <td>
                        {departamentosMap[item.departamento] || item.departamento}
                      </td>
                      <td>{item.hv}</td>
                      <td>
                        {Array.isArray(item.habilidades) && item.habilidades.length > 0 ? (
                          item.habilidades.map((habId) => (
                            <span key={habId} className="badge">
                              {habilidadesMap[habId] || habId}
                            </span>
                          ))
                        ) : (
                          <span className="badge">Sin habilidades</span>
                        )}
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

export default EmpleadosPage;