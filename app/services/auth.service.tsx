import IUser from "../types/user.type";
import api from "./api";
import TokenService from "./token.service";

interface ILogin {
  username: string;
  password: string;
}

const AuthService = {
  login: ({ username, password }: ILogin) => {
    return api
      .post(
        `/auth/login`,
        { username, password }
      ).then(response => {
        const token = response.data.token;
        if (token) {
          TokenService.setToken(token);
          TokenService.setUser(response.data.user);
        }
        return response.data;
      })
  },

  logout: () => {
    TokenService.remove();
  },

  signup: (user: IUser) => {
    return api.post(
      `/auth/signup`,
      user
    ).then(response => {
      const token = response.data.token;
      if (token) {
        TokenService.setToken(token);
        TokenService.setUser(response.data.user);
      }
      return response.data;
    });
  },

  getCurrentUser: () => {
    return TokenService.getUser();
  }
}

export default AuthService;
