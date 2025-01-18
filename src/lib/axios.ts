import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.DEV ? "/api" : "https://api.lifemetrics.io",
  headers: {
    "Content-Type": "application/json",
    "X-Environment": import.meta.env.DEV ? "development" : "production",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
