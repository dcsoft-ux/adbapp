import axios from "axios";
import { getRuntimeConfig } from "../config/runtimeConfig";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { API_BASE_URL } = getRuntimeConfig();
  config.baseURL = API_BASE_URL;
  return config;
});

export default api;