import axios from 'axios';

const instance = axios.create({
  baseURL: "http://bc737dd5e1b2.ngrok.io",
});

export default instance;