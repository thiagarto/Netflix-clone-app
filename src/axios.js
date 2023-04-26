import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});
export default instance;

//le agrega al final del baseURL lo que agreguemos despues ej:"https://api.themoviedb.org/3/eell_up"->/eell_up