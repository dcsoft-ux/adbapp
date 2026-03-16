import axios from "axios";

const postEliminarTrabajo = (url,data) => {
    let urlDelete = `${url}${data}`;
    console.log('*************\nurlDelete: *************\n',urlDelete);
    console.log('*************\nUrl: *************\n',url);
    console.log('*************\data: *************\n',data);
    axios.delete(urlDelete)
  .then(response => {
    console.log(`Deleted post with ID ${postIdToDelete}`);
  })
  .catch(error => {
    console.error(error);
  });
}

export default postEliminarTrabajo