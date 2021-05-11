import axios from 'axios';

const instance = axios.create({
  baseURL: "http://4509ba7e12c6.ngrok.io/",
});

export default instance;