import axios from "axios";

export const api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${import.meta.env.VITE_CLASH_ROYALE_API_KEY}`;

  return config;
});
