import React, { useEffect, useState } from 'react'
import Error from 'next/error'
import IStore from '../types/store.type'
import IInventory from '../types/inventory.type';
import StoreService from '../services/store.service';
import InventoryList from './InventoryList';
import InventoryService from '../services/inventory.service';
import Link from 'next/link';
import StatsService from '../services/stats.service';
import StorePageStats from '../types/storePageStats.type';
import convertNumToPrice from '../utils/convertNumToPrice';
import IOrderStatus from '../types/orderStatus.type';

const initialStorePageStats: StorePageStats = {
  totalItemsInInventory: 0,
  totalStoreWorth: 0,
  pendingPurchaseOrderCount: 0,
  inventoriesAtThresholdCount: 0,
};

const ViewStorePage = ({ store }: { store: IStore | undefined }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [inventories, setInventories] = useState<IInventory[]>([]);
  const [filteredInventories, setFilteredInventories] = useState<IInventory[]>([]);
  const [stats, setStats] = useState(initialStorePageStats);
  const [showInvAtThreshold, setShowInvAtThreshold] = useState(false);

  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const toggleShowInv = () => {
    setShowInvAtThreshold(curr => !curr)
  }

  useEffect(() => {
    setFilteredInventories(() => {
      if (showInvAtThreshold) {
        return inventories.filter((inv) => {
          return inv.quantity <= inv.threshold
        })
      }
      return inventories;
    })
  }, [inventories, showInvAtThreshold])

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
          const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to fetch delete Inventory';
          setError(errMsg);
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
          const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to update inventory';
          setError(errMsg);
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

    const fetchStoreStats = async () => {
      if (store?.id) {
        try {
          const response = await StatsService.getStorePageStats(store?.id);
          setStats(response.data);
          setError('')
        } catch (error: any) {
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError('Unexpected error');
          }
        }
      }
    }

    fetchInventories()
    fetchStoreStats()
  }, [store?.id])

  return (
    <>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom z-50'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      {store?.id && <div>
        <div className='flex justify-between'>
          <div>
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

          <div className='flex flex-col gap-2'>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <Link href={`/purchase-orders?status=${IOrderStatus.PENDING}&store=${store.name}`} className='link cursor-pointer bg-red-400 hover:text-blue-500'>
                <div className="stat p-2 bg-red-400">
                  <div className="stat-title text-center flex flex-col text-xs p-0">
                    <span>
                      Pending
                    </span>
                    <span>
                      Purchase Orders
                    </span>
                  </div>
                  <div className="stat-value text-center text-md font-normal p-0">{stats.pendingPurchaseOrderCount}</div>
                </div>
              </Link>
              <div className="stat p-2">
                <div className="stat-title text-center flex flex-col text-xs p-0">
                  <span>
                    Total Worth
                  </span>
                </div>
                <div className="stat-value text-center text-md font-normal p-0">{convertNumToPrice(stats.totalStoreWorth)}</div>
              </div>
            </div>
            <div className="stats stats-vertical lg:stats-horizontal shadow">
              <div onClick={() => setShowInvAtThreshold(true)} className="stat p-2 bg-red-400">
                <div className="stat-title text-center flex flex-col text-xs p-0">
                  <span>
                    Inventories
                  </span>
                  <span>
                    At Threshold
                  </span>
                </div>
                <div className="stat-value text-center text-md font-normal p-0">{stats.inventoriesAtThresholdCount}</div>
              </div>
              <div className="stat p-2">
                <div className="stat-title text-center flex flex-col text-xs p-0">
                  <span>
                    Total Items
                  </span>
                </div>
                <div className="stat-value text-center text-md font-normal p-0">{stats.totalItemsInInventory}</div>
              </div>
            </div>
          </div>
        </div>

        {!loading ?
          <>
            <button onClick={toggleShowInv} className='btn btn-xs btn-primary'>{showInvAtThreshold ? 'Show All Inventory' : 'Show Inventory At Threshold'}</button>
            <InventoryList showInvAtThreshold={showInvAtThreshold} inventories={filteredInventories} updateInventories={updateInventories} />
          </> : null
        }
      </div>}
      {!loading && !store?.id ? <Error statusCode={404} title={'Store not found'} /> : null}
    </>
  );
}

export default ViewStorePage
