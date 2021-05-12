import axios from 'axios';
import queryString from 'query-string';

// Set ip default config for http requests here
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_NODE_ENV !== "production" ? "https://floating-dawn-15563.herokuapp.com/api" : "http://localhost:5000/api",
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here...
  if (localStorage.getItem('accessToken')) {
    const token = JSON.parse(localStorage.getItem('accessToken'));
    config.headers.Authorization = `Bearer ${token}`;
  }
  else {
    config.headers.Authorization = null;
  }

  return config;
});

axiosClient.interceptors.response.use(response => {
  if (response && response.data) {
    return response.data;
  }

  return response;
}, error => {
  // Handle errors
  throw error;
});

export default axiosClient;