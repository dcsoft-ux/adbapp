import React from 'react'
import postTrabajoApi from "../api/postTrabajo"
import { useNavigate } from 'react-router-dom'

export const AgregarTrabajo = () => {
    const navigate = useNavigate()
    const urlBase = "http://127.0.0.1:8000/CrearTrabajo/";
    const handleTrabajo = (e) =>{
        e.preventDefault();
        let trabajo = document.getElementById('trabajo').value
        let sigla = document.getElementById('sigla').value
        let active = document.getElementById('active').value
        console.log('trabajo: '+trabajo)
        console.log('sigla: '+sigla)
        const trabajoPost = async () => {
                const response = await postTrabajoApi(urlBase, trabajo, sigla, active);
                console.log('response: '+response);
        };
        trabajoPost()
    }
    return(
        <div className="Agregar">
            <h1 className="AgregarTittle">Agregar Trabajo</h1>
            <form className="AgregarFormulario" onSubmit={handleTrabajo}>
                <input type="text" name="trabajo" id="trabajo" className="trabajo AgregarFormularioInput" placeholder="Nombre trabajo"></input>
                <input type="text" name="sigla" id="sigla" className="sigla AgregarFormularioInput" placeholder="Sigla"></input>
                <label htmlFor="active" className='AgregarFormularioInput'> Activo</label>
                <input type='checkbox' name="active" id="active" className="active AgregarFormularioInput" placeholder="active"></input>
                <button className="AgregarFormularioBtn" type="submit" name="trabajo">Agregar</button>
            </form>
        </div>
    )
}

export default AgregarTrabajo;