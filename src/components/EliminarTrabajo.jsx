import React from 'react'
import postEliminarTrabajoApi from "../api/postEliminarTrabajo"
import { useNavigate } from 'react-router-dom'

const EliminarTrabajo = () => {
    const navigate = useNavigate()    
    const urlBase = "http://127.0.0.1:8000/EliminarTrabajo/";
    const handleTrabajo = (e) =>{
        e.preventDefault();
        let trabajo = document.getElementById('trabajo').value
        console.log('trabajo: '+trabajo)
        const trabajoPost = async () => {
                const response = await postEliminarTrabajoApi(urlBase,trabajo);
        };
        trabajoPost()
    }
    return(
        <div className="Agregar">
            <h1 className="AgregarTittle">Eliminar Trabajo</h1>
            <form className="AgregarFormulario" onSubmit={handleTrabajo}>
                <input type="text" name="trabajo" id="trabajo" className="trabajo AgregarFormularioInput" placeholder="Id"></input>
                <button className="AgregarFormularioBtn" type="submit" name="trabajo">Agregar</button>
            </form>
        </div>
    )
}

export default EliminarTrabajo