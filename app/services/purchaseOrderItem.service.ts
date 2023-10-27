import IPurchaseOrderItem from "../types/purchaseOrderItem.type";
import api from "./api";

const getAllPurchaseOrderItems = () => {
  return api.get("/purchase-orders-items");
};

const getPurchaseOrderItemById = (id: number) => {
  return api.get(`/purchase-orders-items/${id}`);
};

const createPurchaseOrderItem = (data: IPurchaseOrderItem) => {
  return api.post("/purchase-orders-items", JSON.stringify(data));
};

const updatePurchaseOrderItem = (id: number, data: IPurchaseOrderItem) => {
  return api.put(`/purchase-orders-items/${id}`, JSON.stringify(data));
};

const deletePurchaseOrderItem = (id: number) => {
  return api.delete(`/purchase-orders-items/${id}`);
};

const PurchaseOrderItemService = {
  getAllPurchaseOrderItems,
  getPurchaseOrderItemById,
  createPurchaseOrderItem,
  updatePurchaseOrderItem,
  deletePurchaseOrderItem,
};

export default PurchaseOrderItemService;
