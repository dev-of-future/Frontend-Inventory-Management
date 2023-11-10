'use client'
import React, { useState, useEffect } from 'react';
import EditStore from './EditStore';
import StoreList from './StoreList';
import IStore from '../types/store.type';
import StoreService from '../services/store.service';
import IStoreType from '../types/storeType.type';
import ShowModalBtn from '../components/ShowModalBtn';
import ViewStorePage from './ViewStorePage';
import { useSearchParams } from 'next/navigation'
import SearchField from './SearchField';
import { useUserContext } from '../context/user';


const initialState: IStore = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: IStoreType.RETAIL,
  openingDate: new Date().toLocaleDateString()
};

const Page = () => {
  const searchParams = useSearchParams();
  const [stores, setStores] = useState<IStore[]>([]);
  const { user } = useUserContext() || { user: undefined };
  const [storesToShow, setStoresToShow] = useState<IStore[]>([]);
  const [showMyStores, setShowMyStores] = useState(true);
  const [storeToUpdate, setStoreToUpdate] = useState<IStore>(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [filterParams, setFilterParams] = useState({});
  const [typeList, setTypeList] = useState<IStoreType[]>([]);

  // TODO frontend filtering

  useEffect(() => {
    setLoading(true)
    const fetchStores = async () => {
      try {
        const response = await StoreService.getFilteredStores(filterParams);
        setStores(response.data);
        const newTypelist = response.data.map((store: IStore) => store.type);
        (typeList.length < newTypelist.length) && setTypeList(newTypelist);
        setError('')
      } catch (error: any) {
        const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to fetch stores';
        setError(errMsg);
      } finally {
        setLoading(false)
      }
    }

    fetchStores()
  }, [filterParams, typeList.length]);

  useEffect(() => {
    if (showMyStores && !(user?.admin)) {
      setStoresToShow(user?.stores || []);
    } else {
      setStoresToShow(stores)
    }
  }, [showMyStores, user, stores])

  const deleteStore = async (id: number) => {
    try {
      await StoreService.deleteStore(id);
      setStores((stores) => {
        return stores.filter((store: IStore) => store.id !== id);
      });
      displayNotification('Store deleted successfully');
      setError('')
    } catch (error: any) {
      const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to delete store';
      setError(errMsg);
    }
  };

  const displayNotification = (message: string) => {
    setNotification(message);
    // Automatically hide the notification after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleUpdateStore = async (store: IStore) => {
    try {
      if (store.id) {
        const updatedStore = await StoreService.updateStore(store.id, store)
        setStores((stores) => {
          return stores.map((store: IStore) => {
            if (store.id === updatedStore.data.id) {
              return updatedStore.data;
            }
            return store;
          })
        })
        displayNotification('Store updated successfully');

      } else {
        const createdStore = await StoreService.createStore(store)
        setStores((stores) => {
          return [...stores, createdStore.data]
        })
        displayNotification('Store added successfully');
      }

      setError('')
    } catch (error: any) {
      const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to update store';
      setError(errMsg);
    }

    // clean up
    toggleModal()
    setStoreToUpdate(initialState);
  }

  const editStore = (store: IStore) => {
    setStoreToUpdate(store);
    toggleModal()
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setStoreToUpdate(initialState)
      return newState
    })
  }

  const toggleShowMyStores = () => {
    if (showMyStores) {
      setShowMyStores(false)
      setStoresToShow(stores)
    } else {
      setStoresToShow(user?.stores || [])
      setShowMyStores(true)
    }
  }

  // Display personalized store page if store name param is present
  const inViewStore = searchParams.get('store')
  if (inViewStore) {
    const store = stores.find(store => store.name == inViewStore)
    const storeWithId = user?.stores?.find(s => s.id == store?.id)
    return <ViewStorePage store={store} isMyStore={storeWithId !== undefined} />
  }

  // Display all stores page if no store name param is present
  return (
    <div>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom z-50'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      <div>
        {user?.admin &&
          <ShowModalBtn text="Add Store" toggleModal={toggleModal} style="btn-accent" />}
        <SearchField typeList={typeList} filterParams={filterParams} setFilterParams={setFilterParams} />
        {!(user?.admin) &&
          <button onClick={toggleShowMyStores} className='btn btn-xs btn-primary'>{showMyStores ? 'Show All Stores' : 'Show My Stores'}</button>}
      </div>

      <StoreList stores={storesToShow} editStore={editStore} deleteStore={deleteStore} />
      <EditStore
        store={storeToUpdate}
        handleUpdateStore={handleUpdateStore}
        open={editMode}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Page;
