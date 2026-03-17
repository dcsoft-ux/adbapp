import React, { useEffect, useState } from "react";
import { obtenerConfiguracion, guardarConfiguracion } from "../api/config";
import { setRuntimeConfig } from "../config/runtimeConfig";

const ConfiguracionPage = () => {
  const [allowedHosts, setAllowedHosts] = useState([""]);
  const [corsOrigins, setCorsOrigins] = useState([""]);
  const [apiBaseUrl, setApiBaseUrl] = useState("http://127.0.0.1:8001/api");
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    try {
      const data = await obtenerConfiguracion();

      setAllowedHosts(
        Array.isArray(data.ALLOWED_HOSTS) && data.ALLOWED_HOSTS.length > 0
          ? data.ALLOWED_HOSTS
          : [""]
      );

      setCorsOrigins(
        Array.isArray(data.CORS_ALLOWED_ORIGINS) && data.CORS_ALLOWED_ORIGINS.length > 0
          ? data.CORS_ALLOWED_ORIGINS
          : [""]
      );

      setApiBaseUrl(data.API_BASE_URL || "http://127.0.0.1:8001/api");
    } catch (error) {
      console.error(error);
      alert("Error cargando configuración");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const handleArrayChange = (setter, values, index, value) => {
    const updated = [...values];
    updated[index] = value;
    setter(updated);
  };

  const handleAddField = (setter, values) => {
    setter([...values, ""]);
  };

  const handleRemoveField = (setter, values, index) => {
    if (values.length === 1) {
      setter([""]);
      return;
    }
    setter(values.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ALLOWED_HOSTS: allowedHosts.map((item) => item.trim()).filter(Boolean),
      CORS_ALLOWED_ORIGINS: corsOrigins.map((item) => item.trim()).filter(Boolean),
      API_BASE_URL: apiBaseUrl.trim(),
    };

    try {
      await guardarConfiguracion(payload);

      setRuntimeConfig({
        API_BASE_URL: payload.API_BASE_URL,
      });

      alert("Configuración actualizada");
      cargar();
    } catch (error) {
      console.error(error);
      alert("Error guardando configuración");
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Configuración</h1>
        <p className="page-subtitle">
          Edita hosts, orígenes CORS y la URL base de la API.
        </p>
      </div>

      <section className="card">
        {loading ? (
          <div className="empty">Cargando configuración...</div>
        ) : (
          <form className="form-grid" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="input-label">API_BASE_URL</label>
              <input
                className="input"
                type="text"
                value={apiBaseUrl}
                onChange={(e) => setApiBaseUrl(e.target.value)}
                placeholder="http://127.0.0.1:8001/api"
              />
            </div>

            <div className="form-group">
              <label className="input-label">ALLOWED_HOSTS</label>

              {allowedHosts.map((value, index) => (
                <div className="field-row" key={`host-${index}`}>
                  <input
                    className="input"
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleArrayChange(setAllowedHosts, allowedHosts, index, e.target.value)
                    }
                    placeholder="Ej: localhost"
                  />
                  <button
                    className="btn btn-danger btn-small"
                    type="button"
                    onClick={() => handleRemoveField(setAllowedHosts, allowedHosts, index)}
                  >
                    Quitar
                  </button>
                </div>
              ))}

              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleAddField(setAllowedHosts, allowedHosts)}
              >
                Agregar host
              </button>
            </div>

            <div className="form-group">
              <label className="input-label">CORS_ALLOWED_ORIGINS</label>

              {corsOrigins.map((value, index) => (
                <div className="field-row" key={`cors-${index}`}>
                  <input
                    className="input"
                    type="text"
                    value={value}
                    onChange={(e) =>
                      handleArrayChange(setCorsOrigins, corsOrigins, index, e.target.value)
                    }
                    placeholder="Ej: http://localhost:5173"
                  />
                  <button
                    className="btn btn-danger btn-small"
                    type="button"
                    onClick={() => handleRemoveField(setCorsOrigins, corsOrigins, index)}
                  >
                    Quitar
                  </button>
                </div>
              ))}

              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleAddField(setCorsOrigins, corsOrigins)}
              >
                Agregar origen
              </button>
            </div>

            <div className="button-row">
              <button className="btn btn-success" type="submit">
                Guardar configuración
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

export default ConfiguracionPage;