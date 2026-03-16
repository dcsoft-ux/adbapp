import React from "react";
import postHabilidadApi from "../api/postHabilidad"
import { useNavigate } from 'react-router-dom'

const AgregarHabilidad = () => {
    const navigate = useNavigate()
    const urlBase = "http://127.0.0.1:8000/Api/VerHabilidades/";
    const handleHabilidad = (e) =>{
        e.preventDefault();
        let data = document.getElementById('habilidad').value
        let datos = document.querySelector('#habilidad').value
        let datoss = document.querySelector('.habilidad').value
        console.log('datos: '+datos)
        console.log('datos: '+datoss)
        const habilidadPost = async () => {
                const response = await postHabilidadApi(urlBase, data);
                // navigate('/')
                console.log('response: '+response);
        };
        habilidadPost()
    }
    return(
        <div className="Agregar">
            <h1 className="AgregarTittle">Habilidades del empleado</h1>
            <form className="AgregarFormulario" onSubmit={handleHabilidad}>
                <input type="text" name="habilidad" id="habilidad" className="habilidad AgregarFormularioInput" placeholder="Habilidad"></input>
                <button className="AgregarFormularioBtn" type="submit" name="habilidad">Agregar</button>
            </form>
        </div>
    )
};

export default AgregarHabilidad;