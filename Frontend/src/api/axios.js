import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ensures absolute path
  withCredentials: true, // optional if you’re sending cookies/auth
});

export default api;
