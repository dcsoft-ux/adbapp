import React, { useEffect, useState } from "react";
import getEmpleadoApi from "../api/getEmpleado";

const EmpleadoLista = () => {
    const [empleadosList, setEmpleadosList] = useState([]);
    const urlBase = "http://127.0.0.1:8000/ListarEmpleados/";
    // const urlBase = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
    useEffect(() => {
        (async () => {
            await loadempleados();
        })();
    }, []);
    const loadempleados = async () => {
        const response = await getEmpleadoApi(urlBase);
        setEmpleadosList(response);
    };
    return (
        <div>
            <h1>
                Empleados
            </h1>
            <div>
                <div>
                <div>
                    {empleadosList.map((empleados) => (
                        <div key={empleados.id}>
                                <p>{empleados.id}</p>
                                <p>{empleados.nombres}</p>
                                <p>{empleados.apellidos}</p>
                                <p>{empleados.hv}</p>
                                <p><img className='avatar' src={empleados.avatar} alt="Avatar"></img></p>
                                <p>{empleados.trabajo}</p>
                                <p>{empleados.departamento}</p>
                                <div>Habilidades: {empleados.habilidades.map(
                                    (habilidades) => (
                                        <div key={empleados.nombres+empleados.apellidos+habilidades}>
                                            <p>{habilidades}</p>
                                        </div>
                                ))}</div>
                        </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
    );
};

export default EmpleadoLista;