import axios from 'axios';

const API_URL = "http://localhost:8080";

const authApi = axios.create({
  baseURL: API_URL
})

authApi.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
})

const noAuthApi = axios.create({
  baseURL: API_URL
})

export {authApi, noAuthApi};