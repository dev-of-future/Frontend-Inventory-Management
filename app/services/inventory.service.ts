import IInventory from "../types/inventory.type";
import api from "./api";

const getAllInventories = () => {
  return api.get("/inventories");
};

const getInventoryById = (id: number) => {
  return api.get(`/inventories/${id}`);
};

// const createInventory = (data: IInventory) => {
//   return api.post("/inventories", JSON.stringify(data));
// };

const updateInventory = (id: number, data: IInventory) => {
  return api.put(`/inventories/${id}`, JSON.stringify(data));
};

const deleteInventory = (id: number) => {
  return api.delete(`/inventories/${id}`);
};

const InventoryService = {
  getAllInventories,
  getInventoryById,
  // createInventory,
  updateInventory,
  deleteInventory,
};

export default InventoryService;
