import axios from "axios";

const BASE_URL =https://gentle-learning-production.up.railway.app/api/v1.0;

const api = axios.create({
  baseURL: BASE_URL,
});

// Add interceptor to set token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
