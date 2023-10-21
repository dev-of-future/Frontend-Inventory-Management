import axios from "axios";
import TokenService from "./token.service";
import AuthService from "./auth.service";

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
    const token = TokenService.getToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// TODO refreshtoken on backend
// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     const isAuthURL = originalConfig.url === "/auth/login" || originalConfig.url === "/auth/signup;
//     if (!isAuthURL && err.response) {
//       // Check if its Access Token expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           if (TokenService.getUser()) {
//             AuthService.login(TokenService.getUser()?.username || '', TokenService.getUser()?.password || '');
//           }

//           // TODO refresh token
//           // const rs = await instance.post("/auth/refreshtoken", {
//           //   refreshToken: TokenService.getLocalRefreshToken(),
//           // });

//           // const { token } = rs.data;
//           // TokenService.setToken(token);

//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default instance;
