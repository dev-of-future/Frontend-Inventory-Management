'use client'
import React, { useState, useEffect } from 'react';
import SupplierService from '../services/supplier.service';
import ISupplier from '../types/supplier.type';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier: ISupplier) => (
              <tr key={supplier.id}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{supplier.name}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {supplier.email}
                </td>
                <td>{supplier.phone}</td>
                <td>{supplier.address}</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Supplier