import axios from 'axios';

const instance = axios.create({
  baseURL: "http://326d3726c020.ngrok.io",
});

export default instance;