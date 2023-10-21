import ISupplier from "../types/supplier.type";
import api from "./api";
import TokenService from "./token.service";

const getAllSuppliers = () => {
  return api.get("/suppliers", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getSupplierById = (id: string) => {
  return api.get(`/suppliers/${id}`);
};

const createSupplier = (data: ISupplier) => {
  return api.post("/suppliers", data);
};

const updateSupplier = (id: string, data: ISupplier) => {
  return api.put(`/suppliers/${id}`, data);
};

const deleteSupplier = (id: string) => {
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
