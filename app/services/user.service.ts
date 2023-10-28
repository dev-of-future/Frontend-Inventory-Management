import IUserRole from "../types/role.type";
import IUser from "../types/user.type";
import api from "./api";
import TokenService from "./token.service";

const UserService = {
  getCurrentUser: (): IUser => {
    return TokenService.getUser();
  },

  isAdmin: () => {
    return TokenService.getUser()?.roles?.includes(IUserRole.ADMIN);
  },

  isManager: () => {
    return TokenService.getUser()?.roles?.includes(IUserRole.MANAGER);
  },
  isStaff: () => {
    return TokenService.getUser()?.roles?.includes(IUserRole.STAFF);
  },
}

export default UserService;
