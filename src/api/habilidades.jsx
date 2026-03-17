import api from "./client";

export const listarHabilidades = async () => {
  const { data } = await api.get("/habilidades/");
  return data;
};

export const crearHabilidad = async (payload) => {
  const { data } = await api.post("/habilidades/crear/", payload);
  return data;
};

export const actualizarHabilidad = async (id, payload) => {
  const { data } = await api.put(`/habilidades/${id}/actualizar/`, payload);
  return data;
};

export const eliminarHabilidad = async (id) => {
  const { data } = await api.delete(`/habilidades/${id}/eliminar/`);
  return data;
};