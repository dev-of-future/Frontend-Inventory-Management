import axios from "axios";
import TokenService from "./token.service";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_DEV_URL;

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "accept": "*/*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getToken() || '';
    config.headers["Authorization"] = 'Bearer ' + token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// TODO refreshtoken on backend & update
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    const isAuthURL = (originalConfig?.url === "/auth/login") || (originalConfig?.url === "/auth/signup");
    if (!isAuthURL && err.response) {
      // Check if its Access Token expired
      if (err.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;

        try {
          // Auth.refreshtoken()
          TokenService.remove()
          window.location.replace('/login')
          return instance(originalConfig);
        } catch (_error) {
          TokenService.remove()
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default instance;
