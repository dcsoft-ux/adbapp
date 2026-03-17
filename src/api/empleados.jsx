import api from "./client";

export const listarEmpleados = async () => {
  const { data } = await api.get("/empleados/");
  return data;
};

export const crearEmpleado = async (formData) => {
  const { data } = await api.post("/empleados/crear/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const actualizarEmpleado = async (id, formData) => {
  const { data } = await api.put(`/empleados/${id}/actualizar/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const eliminarEmpleado = async (id) => {
  const { data } = await api.delete(`/empleados/${id}/eliminar/`);
  return data;
};