'use client'
import React, { useState, useEffect } from 'react';
import EditItem from './EditItem';
import ItemList from './ItemList';
import IItem from '../types/item.type';
import ItemService from '../services/item.service';
import ShowModalBtn from '../components/ShowModalBtn';
import SearchField from './SearchField';

const initialState: IItem = {
  name: '',
  shortDescription: '',
  longDescription: '',
  price: 0,
  quantity: 0,
};

const Page = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState<IItem>(initialState);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [filterParams, setFilterParams] = useState({});

  useEffect(() => {
    setLoading(true)
    const fetchItems = async () => {
      try {
        const response = await ItemService.getFilteredItems(filterParams);
        setItems(response.data);
        const categoryList = new Set<string>();
        response.data.forEach((item: IItem) => item.category && categoryList.add(item.category?.name));
        setCategoryList(Array.from(categoryList));
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
    fetchItems()
  }, [filterParams]);

  const deleteItem = async (id: number) => {
    try {
      const response = await ItemService.deleteItem(id);
      setItems((items) => {
        return items.filter((item: IItem) => item.id !== id);
      });
      displayNotification('Item deleted successfully');
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

  const handleUpdateItem = async (item: IItem) => {
    toggleModal();
    try {
      if (item.id) {
        const updatedItem = await ItemService.updateItem(item.id, item)
        setItems((items) => {
          return items.map((item: IItem) => {
            if (item.id === updatedItem.data.id) {
              return updatedItem.data;
            }
            return item;
          })
        })
        displayNotification('Item updated successfully');

      } else {
        const createdItem = await ItemService.createItem(item)
        setItems((items) => {
          return [...items, createdItem.data]
        })
        displayNotification('Item added successfully');

      }

      setError('')
    } catch (err: any) {
      let errMsg = 'Unexpected error'
      if (err.response) {
        errMsg = err.response.data?.message;
      }
      setError(errMsg);
    }
  }

  const editItem = (item: IItem) => {
    setItemToUpdate(item);
    toggleModal()
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setItemToUpdate(initialState)
      return newState
    })
  }

  return (
    <div>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      <div>
        <ShowModalBtn text="Add Item" toggleModal={toggleModal} style="btn-accent" />
        <SearchField categoryList={categoryList} filterParams={filterParams} setFilterParams={setFilterParams} />
      </div>

      <ItemList items={items} editItem={editItem} deleteItem={deleteItem} />
      <EditItem
        item={itemToUpdate}
        handleUpdateItem={handleUpdateItem}
        open={editMode}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Page;
