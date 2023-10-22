import ISupplier from "../types/supplier.type";
import api from "./api";

const getAllSuppliers = () => {
  return api.get("/suppliers");
};

const getSupplierById = (id: number) => {
  return api.get(`/suppliers/${id}`);
};

const getSuppliersCategories = (id: number) => {
  return api.get(`/suppliers/${id}/categories`);
};

const createSupplier = (data: ISupplier) => {
  return api.post("/suppliers", JSON.stringify(data));
};

const updateSupplier = (id: number, data: ISupplier) => {
  return api.put(`/suppliers/${id}`, JSON.stringify(data));
};

const deleteSupplier = (id: number) => {
  return api.delete(`/suppliers/${id}`);
};

const SupplierService = {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};

export default SupplierService;
