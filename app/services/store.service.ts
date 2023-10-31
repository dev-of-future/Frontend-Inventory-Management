import IStore from "../types/store.type";
import api from "./api";

const getAllStores = () => {
  return api.get("/stores");
};

const getFilteredStores = (params: any) => {
  return api.get("/stores/search", { params });
};

const getStoreById = (id: number) => {
  return api.get(`/stores/${id}`);
};

const getStoreInventoriesById = (id: number) => {
  return api.get(`/stores/${id}/inventories`);
}

const createStore = (data: IStore) => {
  return api.post("/stores", JSON.stringify(data));
};

const updateStore = (id: number, data: IStore) => {
  return api.put(`/stores/${id}`, JSON.stringify(data));
};

const deleteStore = (id: number) => {
  return api.delete(`/stores/${id}`);
};

const StoreService = {
  getAllStores,
  getFilteredStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
  getStoreInventoriesById,
};

export default StoreService;
