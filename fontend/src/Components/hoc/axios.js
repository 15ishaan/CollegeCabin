import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://8d2d9e470158.ngrok.io'
});

export default instance;