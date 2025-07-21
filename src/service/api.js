

import axios from "axios";

const BASE_URL ="https://gentle-learning-production.up.railway.app/api/v1.0";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Auth Header:", config.headers.Authorization); // Debugging
    } else {
      console.warn("No token found in localStorage.");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
