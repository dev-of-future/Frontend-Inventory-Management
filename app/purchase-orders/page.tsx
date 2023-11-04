'use client'
import React, { useState, useEffect, useCallback } from 'react';
import IPurchaseOrder from '../types/purchaseOrder.type';
import PurchaseOrderService from '../services/purchaseOrder.service';
import StoreService from '../services/store.service';
import AddStoreModal from './AddStoreModal';
import ShowModalBtn from '../components/ShowModalBtn';
import PurchaseOrderList from './PurchaseOrderList';
import IStore from '../types/store.type';
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import IOrderStatus from '../types/orderStatus.type';
import Select from 'react-tailwindcss-select';


const Page = () => {
  const [purchaseOrders, setPurchaseOrders] = useState<IPurchaseOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [newPOModalOpen, setnewPOModalOpen] = useState(false);

  // Filtering PurchaseOrders
  const searchParams = useSearchParams();
  const store = searchParams.get('store')
  const status = searchParams.get('status')
  const [params, setParams] = useState({ store, status });
  const router = useRouter()
  const pathname = usePathname()
  const [filteredOrders, setFilteredOrders] = useState<IPurchaseOrder[]>([]);
  const [storeOptions, setStoreOptions] = useState<IStore[]>([]);

  useEffect(() => {
    setLoading(true)
    const fetchPurchaseOrders = async () => {
      try {
        const response = await PurchaseOrderService.getAllPurchaseOrders();
        setPurchaseOrders(response.data);
        setFilteredOrders(response.data)
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

    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStores();
        setStoreOptions(response.data);
        setError('')
      } catch (error: any) {
        let errMsg = 'Unable to fetch store options';
        if (error.response) {
          errMsg = (error.response.data.message);
        }
        setError(errMsg);
      }
    }
    fetchStores()
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    setFilteredOrders(() => {
      return purchaseOrders.filter(po => {
        let show = true;
        if ((params.status) && (params.status.length > 0)) {
          if (po.status !== params.status) {
            show &&= false;
          }
        }
        if ((params.store) && (params.store.length > 0)) {
          if (po.store?.name !== params.store) {
            show &&= false;
          }
        }
        return show;
      })
    })
  }, [params, purchaseOrders])

  const resetFilter = () => {
    setParams({ store: null, status: null })
    setFilteredOrders(purchaseOrders);
  }

  const updateRoute = () => {

  }

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
    if (!purchaseOrder.id) return;
    switch (action.type) {
      case 'DELETE':
        try {
          const res = await PurchaseOrderService.deletePurchaseOrder(purchaseOrder.id)

          setPurchaseOrders((purchaseOrders) => {
            return purchaseOrders.filter((po) => po.id !== purchaseOrder.id)
          })

          displayNotification('Purchase Order deleted successfully');
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
          const res = await PurchaseOrderService.updatePurchaseOrder(purchaseOrder.id, purchaseOrder)

          setPurchaseOrders((purchaseOrders) => {
            return purchaseOrders.map((po) => po.id === purchaseOrder.id ? res.data : po)
          })

          displayNotification('Purchase Order updated successfully');
        } catch (error: any) {
          let errMsg = 'Unable to update purchase order';
          if (error.response) {
            errMsg = (error.response.data.message);
          }
          displayNotification(errMsg);
        }
        break;
      default:
    }
  }

  return (
    <>
      {loading && <div className="block loading loading-bars loading-lg mb-2"></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}

      <div className='flex justify-between'>
        <ShowModalBtn text="Create Store Order" toggleModal={toggleNewPOModal} style="btn-accent" />
        <div className='flex gap-3 items-end'>
          <div>
            <label htmlFor="store"
              className="block text-sm font-medium text-gray-500"
            >
              Filter by Store
            </label>
            <Select
              placeholder="Select Store..."
              value={params.store?.length ? { value: params.store, label: params.store } : null}
              primaryColor={"indigo"}
              onChange={(data: any) => setParams(prev => ({ ...prev, store: data?.value }))}
              options={storeOptions.map((option) => ({ value: option.name, label: option.name }))}
            />
          </div>
          <div>
            <label htmlFor="status"
              className="block text-sm font-medium text-gray-500"
            >
              Filter by Status
            </label>
            <Select
              placeholder="Select Status..."
              value={params.status?.length ? { value: params.status, label: params.status } : null}
              primaryColor={"indigo"}
              onChange={(data: any) => setParams(prev => ({ ...prev, status: data?.value }))}
              options={Object.values(IOrderStatus).map((option) => ({ value: option, label: option }))}
            />
          </div>
          <button onClick={resetFilter} className='btn btn-md'>
            Reset
          </button>
        </div>
      </div>
      <AddStoreModal
        store={null}
        open={newPOModalOpen}
        toggleModal={toggleNewPOModal}
        addStore={createNewPO}
      />

      <PurchaseOrderList purchaseOrders={filteredOrders} updatePurchaseOrders={updatePurchaseOrders} />
    </>
  )
}

export default Page