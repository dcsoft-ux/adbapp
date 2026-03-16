import axios from "axios";

const getEmpleadoApi = (url) => {
    return axios.get(url).then(async (res) => {
        let empleadosArray = [];
                await axios.all(
                    res.data.map((habilidades) => {
                        empleadosArray.push(habilidades);
                    })
                );
        return empleadosArray;
    });
};

export default getEmpleadoApi;