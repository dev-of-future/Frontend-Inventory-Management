'use client'
import React, { useState, useEffect } from 'react';
import EditSupplier from './EditSupplier';
import Supplier from './Supplier';
import ISupplier from '../types/supplier.type';
import SupplierService from '../services/supplier.service';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true)
    const fetchSuppliers = async () => {
      try {
        const response = await SupplierService.getAllSuppliers();
        setSuppliers(response.data);
        setError('')
      } catch (error: any) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError('Unexpected error');
        }
      } finally {
        setLoading(false)
      }

    }
    fetchSuppliers()
  }, []);

  const deleteSupplier = async (id: number) => {
    try {
      const response = await SupplierService.deleteSupplier(id);
      setSuppliers(response.data);
      setSuppliers((suppliers) => {
        return suppliers.filter((supplier: ISupplier) => supplier.id !== id);
      });
      setError('')
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Unexpected error');
      }
    }
  };

  const editSupplier = (supplier: ISupplier) => {
    setSelectedSupplier(supplier);
  };

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <span className="loading loading-bars loading-lg"></span>}
      <div className="container mx-auto my-8">
        <div className="flex shadow border-b">
          <table className="min-w-full table">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  ID
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  NAME
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  EMAIL
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  PHONE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6">
                  ADDRESS
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {suppliers?.map((supplier: ISupplier) => (
                  <Supplier
                    supplier={supplier}
                    key={supplier.id}
                    deleteSupplier={deleteSupplier}
                    editSupplier={editSupplier}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <EditSupplier
        supplierCurrInfo={selectedSupplier}
        setSelectedSupplier={setSelectedSupplier}
      />
    </>
  );
};

export default SupplierList;
