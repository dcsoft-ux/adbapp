import React from 'react'
import postTrabajoApi from "../api/getActualizarTrabajo"
import { useNavigate } from 'react-router-dom'

const ActualizarTrabajo = () => {
    const navigate = useNavigate()
    const urlBase = "http://127.0.0.1:8000/ActualizarTrabajo/";
    const handleTrabajo = (e) =>{
            e.preventDefault();
            let id = document.getElementById('id').value
            let trabajo = document.getElementById('trabajo').value
            let sigla = document.getElementById('sigla').value
            let active = document.getElementById('active').value
            const trabajoPost = async () => {
            const response = await postTrabajoApi(urlBase,id, trabajo, sigla, active);
        };
        trabajoPost()
    }
    return(
        <div className="Agregar">
            <h1 className="AgregarTittle">Actualizar Trabajo</h1>
            <form className="AgregarFormulario" onSubmit={handleTrabajo}>
                <input type="number" name="id" id="id" className="id AgregarFormularioInput" placeholder="Id trabajo"></input>
                <input type="text" name="trabajo" id="trabajo" className="trabajo AgregarFormularioInput" placeholder="Nombre trabajo"></input>
                <input type="text" name="sigla" id="sigla" className="sigla AgregarFormularioInput" placeholder="Sigla"></input>
                <label htmlFor="active" className='AgregarFormularioInput'> Activo</label>
                <input type='checkbox' name="active" id="active" className="active AgregarFormularioInput" placeholder="active"></input>
                <button className="AgregarFormularioBtn" type="submit" name="trabajo">Agregar</button>
            </form>
        </div>
    )
}

export default ActualizarTrabajo