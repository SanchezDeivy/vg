import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_APIURL || "http://localhost:8086/api/aiome",
  timeout: 10000,
});

export default API;
