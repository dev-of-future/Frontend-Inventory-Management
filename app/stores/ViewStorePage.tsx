import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import IStore from '../types/store.type'
import IInventory from '../types/inventory.type';
import StoreService from '../services/store.service';
import InventoryList from './InventoryList';
import InventoryService from '../services/inventory.service';

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
    try {
      switch (action.type) {
        case 'DELETE':
          await InventoryService.deleteInventory(inventory.id)

          setInventories((inventories) => {
            return inventories.filter((inv) => inv.id !== inventory.id)
          })
          displayNotification('Inventory deleted successfully');
          break;
        case 'UPDATE':
          const res = await InventoryService.updateInventory(inventory.id, inventory)

          setInventories((inventories) => {
            return inventories.map((inv) => {
              if (inv.id === inventory.id) {
                return res.data
              }
              return inv
            })
          })
          displayNotification('Inventory updated successfully');
          break;
        default:
      }
    } catch (error: any) {
      let errMsg = 'Unexpected error'
      if (error?.response) {
        errMsg = error.response.data?.message;
      }
      displayNotification(errMsg);
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
        </div>

        {!loading ? <InventoryList inventories={inventories} updateInventories={updateInventories} /> : null}
      </div>}
      {!loading && !store?.id ? <Error statusCode={404} title={'Store not found'} /> : null}
    </>
  );
}

export default ViewStorePage
