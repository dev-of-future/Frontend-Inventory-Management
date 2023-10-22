import storage from '../utils/storage';
import IUser from '../types/user.type'

const {
  getFromLocalStorage,
  setInLocalStorage,
  removeFromLocalStorage,
} = storage;

const TokenService = {
  set({ user, token }: { user: IUser, token: string }): void {
    this.setToken(token);
    this.setUser(user);
  },
  getUser(): IUser {
    return getFromLocalStorage('user') as IUser;
  },

  setUser(user: IUser): void {
    setInLocalStorage('user', user);
  },

  setToken(token: any): void {
    setInLocalStorage('token', token);
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