import api from "./client";

export const obtenerConfiguracion = async () => {
  const { data } = await api.get("/configuracion/");
  return data;
};

export const guardarConfiguracion = async (payload) => {
  const { data } = await api.post("/configuracion/", payload);
  return data;
};