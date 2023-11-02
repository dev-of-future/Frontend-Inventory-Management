import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import IStore from '../types/store.type'
import IInventory from '../types/inventory.type';
import StoreService from '../services/store.service';
import InventoryList from './InventoryList';
import InventoryService from '../services/inventory.service';
import Link from 'next/link';

const ViewStorePage = ({ store }: { store: IStore | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [inventories, setInventories] = useState<IInventory[]>([]);

  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const updateInventories = async (inventory: IInventory, action: { type: string }) => {
    if (!inventory.id) return;
    switch (action.type) {
      case 'DELETE':
        try {
          const res = await InventoryService.deleteInventory(inventory.id)

          setInventories((inventories) => {
            return inventories.filter((inv) => inv.id !== inventory.id)
          })

          displayNotification('Inventory deleted successfully');
        } catch (error: any) {
          let errMsg = 'Unable to delete';
          if (error.response) {
            errMsg = (error.response.data.message);
          }
          displayNotification(errMsg);
        }
        break;
      case 'UPDATE':
        try {
          const res = await InventoryService.updateInventory(inventory.id, inventory)

          setInventories((inventories) => {
            return inventories.map((inv) => inv.id === inventory.id ? res.data : inv)
          })

          displayNotification('Inventory updated successfully');
        } catch (error: any) {
          let errMsg = 'Unable to update inventory';
          if (error.response) {
            errMsg = (error.response.data.message);
          }
          displayNotification(errMsg);
        }
        break;
      default:
    }
  }

  useEffect(() => {
    setLoading(true)
    const fetchInventories = async () => {
      if (store?.id) {
        try {
          const response = await StoreService.getStoreInventoriesById(store.id);
          setInventories(response.data);
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
    }
    fetchInventories()

  }, [store?.id])

  return (
    <>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      {store?.id && <div>
        <div>
          {/* HERO SPACE MORE INFO COMING UP */}
          <h1 className="text-2xl font-bold text-gray-900">
            {store.name}
          </h1>
          <p className="text-gray-700">
            {store.email}
          </p>
          <p className="text-gray-700">
            {store.phone}
          </p>
          <p className="text-gray-700">
            {store.address}
          </p>
          <p className="text-gray-700">
            {store.openingDate}
          </p>
          <p className='text-red-300 text-xs max-w-xs mt-2'>
            You can add inventory by creating and delivering a <Link href="/purchase-orders">Purchase Order</Link>
          </p>
        </div>

        {!loading ? <InventoryList inventories={inventories} updateInventories={updateInventories} /> : null}
      </div>}
      {!loading && !store?.id ? <Error statusCode={404} title={'Store not found'} /> : null}
    </>
  );
}

export default ViewStorePage
