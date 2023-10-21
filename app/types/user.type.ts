import IUserRole from "./role.type";

export default interface IUser {
  id?: number;
  email: string;
  firstName: string;
  username: string;
  lastName: string;
  password?: string;
  roles?: IUserRole[];
}
