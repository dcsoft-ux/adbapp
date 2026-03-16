import axios from "axios";

const getTrabajoApi = (url) => {
    return axios.get(url).then(async (res) => {        
        let trabajosArray = [];
        res.data.map((trabajos) => {
            trabajosArray.push(trabajos);
        })
        return trabajosArray;
    });
};

export default getTrabajoApi;