import Axios from "axios";

let urls = {
    test: `https://api.openweathermap.org/data/2.5/`,
    development: 'https://api.openweathermap.org/data/2.5/',
    production: 'https://api.openweathermap.org/data/2.5/'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;