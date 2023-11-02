'use client'
import React, { useState, useEffect } from 'react';
import EditSupplier from './EditSupplier';
import SupplierList from './SupplierList';
import ISupplier from '../types/supplier.type';
import SupplierService from '../services/supplier.service';
import ShowModalBtn from '../components/ShowModalBtn';

const initialState: ISupplier = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const Page = () => {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [supplierToUpdate, setSupplierToUpdate] = useState<ISupplier>(initialState);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [editMode, setEditMode] = useState(false);

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
      setSuppliers((suppliers) => {
        return suppliers.filter((supplier: ISupplier) => supplier.id !== id);
      });
      displayNotification('Supplier deleted successfully');
      setError('')
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Unexpected error');
      }
    }
  };

  const displayNotification = (message: string) => {
    setNotification(message);
    // Automatically hide the notification after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleUpdateSupplier = async (supplier: ISupplier) => {
    try {
      if (supplier.id) {
        const updatedSupplier = await SupplierService.updateSupplier(supplier.id, supplier)
        setSuppliers((suppliers) => {
          return suppliers.map((supplier: ISupplier) => {
            if (supplier.id === updatedSupplier.data.id) {
              return updatedSupplier.data;
            }
            return supplier;
          })
        })
        displayNotification('Supplier updated successfully');

      } else {
        const createdSupplier = await SupplierService.createSupplier(supplier)
        setSuppliers((suppliers) => {
          return [...suppliers, createdSupplier.data]
        })
        displayNotification('Supplier added successfully');

      }

      setError('')
    } catch (err: any) {
      let errMsg = 'Unexpected error'
      if (err.response) {
        errMsg = err.response.data?.message;
      }
      setError(errMsg);
    }

    // clean up
    toggleModal()
    setSupplierToUpdate(initialState);
  }

  const editSupplier = (supplier: ISupplier) => {
    setSupplierToUpdate(supplier);
    toggleModal()
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setSupplierToUpdate(initialState)
      return newState
    })
  }

  return (
    <div>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      {!loading && <>
        <ShowModalBtn text="Add Supplier" toggleModal={toggleModal} style="btn-accent" />
        <SupplierList suppliers={suppliers} editSupplier={editSupplier} deleteSupplier={deleteSupplier} />
      </>}
      <EditSupplier
        supplier={supplierToUpdate}
        handleUpdateSupplier={handleUpdateSupplier}
        open={editMode}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Page;
