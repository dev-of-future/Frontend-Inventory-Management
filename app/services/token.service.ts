import storage from '../utils/storage';
import IUser from '../types/user.type'
import { useUserContext } from '../context/user';

const {
  getFromLocalStorage,
  setInLocalStorage,
  removeFromLocalStorage,
} = storage;

const TokenService = {
  getUser(): IUser {
    return getFromLocalStorage('user') as IUser;
  },

  setUser(user: IUser): void {
    setInLocalStorage('user', JSON.stringify(user));
    const { login } = useUserContext()
    login(user)
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
    const { logout } = useUserContext()
    logout()
  },
};

export default TokenService;