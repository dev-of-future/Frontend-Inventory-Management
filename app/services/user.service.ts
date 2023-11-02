import IUser from "../types/user.type";
import api from "./api";

const getAllUsers = () => {
  return api.get("/users");
};

const getFilteredUsers = (params: {}) => {
  return api.get("/users/search", { params });
};

const getUserById = (id: number) => {
  return api.get(`/users/${id}`);
};

const createUser = (data: IUser) => {
  return api.post("/users", JSON.stringify(data));
};

const updateUser = (id: number, data: IUser) => {
  return api.put(`/users/${id}`, JSON.stringify(data));
};

const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`);
};

const UserService = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getFilteredUsers,
};

export default UserService;
