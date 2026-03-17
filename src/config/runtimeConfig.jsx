let runtimeConfig = {
  API_BASE_URL: "http://127.0.0.1:8001/api",
};

export const setRuntimeConfig = (newConfig) => {
  runtimeConfig = {
    ...runtimeConfig,
    ...newConfig,
  };
};

export const getRuntimeConfig = () => runtimeConfig;