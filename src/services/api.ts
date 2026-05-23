import axios from "axios";

/* =========================================
   BASE API CONFIG
========================================= */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================================
   REQUEST INTERCEPTOR (OPTIONAL AUTH READY)
========================================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================================
   RESPONSE INTERCEPTOR (ERROR HANDLING GLOBAL)
========================================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      "Terjadi kesalahan pada server";

    return Promise.reject(message);
  }
);

export default api;