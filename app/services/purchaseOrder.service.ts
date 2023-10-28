import IPurchaseOrder from "../types/purchaseOrder.type";
import api from "./api";

const getAllPurchaseOrders = () => {
  return api.get("/purchase-orders");
};

const getPurchaseOrderById = (id: number) => {
  return api.get(`/purchase-orders/${id}`);
};

const createPurchaseOrder = (data: IPurchaseOrder) => {
  return api.post("/purchase-orders", JSON.stringify(data));
};

const updatePurchaseOrder = (id: number, data: IPurchaseOrder) => {
  return api.put(`/purchase-orders/${id}`, JSON.stringify(data));
};

const deletePurchaseOrder = (id: number) => {
  return api.delete(`/purchase-orders/${id}`);
};

const PurchaseOrderService = {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
};

export default PurchaseOrderService;
