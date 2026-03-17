import api from "./client";

export const listarDepartamentos = async () => {
  const { data } = await api.get("/departamentos/");
  return data;
};

export const crearDepartamento = async (payload) => {
  const { data } = await api.post("/departamentos/crear/", payload);
  return data;
};

export const actualizarDepartamento = async (id, payload) => {
  const { data } = await api.put(`/departamentos/${id}/actualizar/`, payload);
  return data;
};

export const eliminarDepartamento = async (id) => {
  const { data } = await api.delete(`/departamentos/${id}/eliminar/`);
  return data;
};