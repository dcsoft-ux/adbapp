import axios from "axios";

const postTrabajoApi = (url,trabajo,sigla, activo)=>{

    console.log('Url: ',url);
    console.log('trabajo: ',trabajo);
    console.log('activo: ',activo);
    console.log('sigla: ',sigla);
    if(activo=='on'){
        activo=true
    }
    else{
        activo=false
    }
    const data = {
        "nombreTrabajo": trabajo,
        "siglaTrabajo": sigla,
        "activoTrabajo": activo
    }
    console.log('Objeto: ',data);
    axios.post(url, data)
    .then(response => {
        console.log('post success');
        console.log('response',response)
    })
    .catch(error => {
        console.log('Oh No! Error!');
        console.log(error)
    })
}
export default postTrabajoApi;