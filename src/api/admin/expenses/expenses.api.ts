import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'ngrok-skip-browser-warning': 'true'
  }
});

export default api;
