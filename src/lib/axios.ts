import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.lifemetrics.io",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to automatically add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
