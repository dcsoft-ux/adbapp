import axios from "axios";

const postHabilidadApi = (url,habilidad)=>{

    console.log('Url: ',url);
    console.log('Texto: ',habilidad);
    const data = {
        "habilidad": habilidad
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
export default postHabilidadApi;