import storage from '../utils/storage';
import IUser from '../types/user.type'

const {
  getFromLocalStorage,
  setInLocalStorage,
  removeFromLocalStorage,
} = storage;

const TokenService = {
  getUser(): IUser | undefined {
    return JSON.parse(getFromLocalStorage('user')) as IUser;
  },

  setUser(user: IUser): void {
    setInLocalStorage('user', JSON.stringify(user));
  },

  setToken(token: any): void {
    setInLocalStorage('token', JSON.stringify(token));
  },

  getToken(): string | undefined {
    return getFromLocalStorage('token');
  },

  // TODO
  getRefreshToken(): string | undefined {
    return getFromLocalStorage('refreshtoken');
  },

  remove(): void {
    removeFromLocalStorage('token');
    removeFromLocalStorage('user');
  },
};

export default TokenService;