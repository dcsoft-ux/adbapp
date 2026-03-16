import React, { useEffect, useState } from "react";
import getTrabajoApi from "../api/getTrabajo";

const TrabajosLista = () => {
    const [trabajosList, setTrabajosList] = useState([]);
    const urlBase = "http://127.0.0.1:8000/ListarTrabajos/";
    // const urlBase = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
    useEffect(() => {
        (async () => {
            await loadtrabajos();
        })();
    }, []);
    const loadtrabajos = async () => {
        const response = await getTrabajoApi(urlBase);
        setTrabajosList(response);
    };
    return (
        <div>
            <h1>
                Trabajos Lista
            </h1>
            <div>
                <div>length: 
                    {trabajosList.length}
                    {trabajosList.map((trabajo)=>(
                        <div key={trabajo.id}>
                            <p>{trabajo.id}</p>
                            <p>{trabajo.nombreTrabajo}</p>
                            <p>{trabajo.siglaTrabajo}</p>
                            <p>{trabajo.activoTrabajo}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrabajosLista