import IItem from "../types/item.type";
import api from "./api";

const getAllItems = () => {
  return api.get("/items");
};

const getFilteredItems = (params: {}) => {
  return api.get("/items/search", { params });
};

const getItemById = (id: number) => {
  return api.get(`/items/${id}`);
};

const createItem = (data: IItem) => {
  return api.post("/items", JSON.stringify(data));
};

const updateItem = (id: number, data: IItem) => {
  return api.put(`/items/${id}`, JSON.stringify(data));
};

const deleteItem = (id: number) => {
  return api.delete(`/items/${id}`);
};

const ItemService = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getFilteredItems,
};

export default ItemService;
