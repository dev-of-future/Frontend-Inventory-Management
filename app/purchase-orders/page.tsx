'use client'
import React, { useState, useEffect } from 'react';
import IPurchaseOrder from '../types/purchaseOrder.type';
import PurchaseOrderService from '../services/purchaseOrder.service';
import AddStoreModal from './AddStoreModal';
import ShowModalBtn from '../components/ShowModalBtn';
import PurchaseOrderList from './PurchaseOrderList';
import IStore from '../types/store.type';


const Page = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [newPOModalOpen, setnewPOModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchPurchaseOrders = async () => {
      try {
        const response = await PurchaseOrderService.getAllPurchaseOrders();
        setPurchaseOrders(response.data);
        setError('')
      } catch (error: any) {
        let errMsg = 'Unexpected error';
        if (error.response) {
          errMsg = (error.response.data.message);
        }
        setError(errMsg);
      }
      setLoading(false)
    }
    fetchPurchaseOrders()
  }, []);

  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const toggleNewPOModal = () => {
    setnewPOModalOpen((newPOModalOpen) => {
      const newState = !newPOModalOpen;
      return newState
    })
  }

  const createNewPO = async (store: IStore) => {
    const createdPurchaseOrder = await PurchaseOrderService.createPurchaseOrder({ store })
    setPurchaseOrders((purchaseOrders) => {
      return [...purchaseOrders, createdPurchaseOrder.data]
    })
    displayNotification('Purchase Order added successfully');
  }

  const updatePurchaseOrders = async (purchaseOrder: IPurchaseOrder, action: { type: string }) => {
    switch (action.type) {
      case 'DELETE':
        setPurchaseOrders((purchaseOrders) => {
          return purchaseOrders.filter((po) => po.id !== purchaseOrder.id)
        })
        break;
      case 'UPDATE':
        setPurchaseOrders((purchaseOrders) => {
          return purchaseOrders.map((po) => {
            if (po.id === purchaseOrder.id) {
              return purchaseOrder
            }
            return po
          })
        })
        break;
      default:
    }
  }

  return (
    <>
      {loading && <div className="block loading loading-bars loading-lg mb-2"></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}

      <ShowModalBtn text="Create Store Order" toggleModal={toggleNewPOModal} style="btn-accent" />

      <AddStoreModal
        store={null}
        open={newPOModalOpen}
        toggleModal={toggleNewPOModal}
        addStore={createNewPO}
      />

      {!loading && Array.isArray(purchaseOrders) &&
        <PurchaseOrderList purchaseOrders={purchaseOrders} updatePurchaseOrders={updatePurchaseOrders} />
      }
    </>
  )
}

export default Page