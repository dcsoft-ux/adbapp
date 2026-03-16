import axios from "axios";

const getActualizarTrabajo = (url,id,trabajo,sigla, activo)=>{
    let urlUpdate = `${url}${id}/`;
    if(activo=='on'){
        activo=true
    }
    else{
        activo=false
    }
    console.log('Url: ',urlUpdate);
    console.log('trabajo: ',trabajo);
    console.log('sigla: ',sigla);
    console.log('activo: ',activo);
    const data = {
        "nombreTrabajo": trabajo,
        "siglaTrabajo": sigla,
        "activoTrabajo": activo
    }
    console.log('Objeto: ',data);
    axios.put(urlUpdate, data)
    .then(response => {
        console.log('post success');
        console.log('response',response)
    })
    .catch(error => {
        console.log('Oh No! Error!');
        console.log(error)
    })
}

export default getActualizarTrabajo