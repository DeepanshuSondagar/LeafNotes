import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:3001/api"  // ← fixed typo
    : "/api",
  withCredentials: true,
});

export default axiosInstance;