import axios from "axios";
import { store } from "./store";
import { setCredentials, logout } from "./authSlice";

const url = "http://localhost:5000";
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken; 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: auto-refresh access token on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axios.get("/api/refresh", {
          baseURL: url,
          withCredentials: true,
        });
        store.dispatch(
          setCredentials({
            accessToken: res.data.accessToken, 
            user: res.data.user,
          })
        );
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`; 
        return api(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;