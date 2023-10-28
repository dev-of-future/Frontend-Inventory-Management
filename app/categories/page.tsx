'use client'
import React, { useState, useEffect } from 'react';
import EditCategory from './EditCategory';
import CategoryList from './CategoryList';
import ICategory from '../types/category.type';
import CategoryService from '../services/category.service';
import ShowModalBtn from '../components/ShowModalBtn';

const initialState: ICategory = {
  name: '',
};

const Page = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState<ICategory>(initialState);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data);
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
    fetchCategories()
  }, []);

  const deleteCategory = async (id: number) => {
    try {
      const response = await CategoryService.deleteCategory(id);
      setCategories((categories) => {
        return categories.filter((category: ICategory) => category.id !== id);
      });
      displayNotification('Category deleted successfully');
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

  const handleUpdateCategory = async (category: ICategory) => {
    toggleModal();
    try {
      if (category.id) {
        const res = await CategoryService.updateCategory(category.id, category)
        setCategories((categories) => {
          return categories.map((category: ICategory) => {
            if (category.id === res.data.id) {
              return res.data;
            }
            return category;
          })
        })
        displayNotification('Category updated successfully');
      } else {
        const createdCategory = await CategoryService.createCategory(category)
        setCategories((categories) => {
          return [...categories, createdCategory.data]
        })
        displayNotification('Category added successfully');

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

  const editCategory = (category: ICategory) => {
    setCategoryToUpdate(category);
    toggleModal()
  };

  const toggleModal = () => {
    setEditMode((editMode) => {
      const newState = !editMode;
      if (!newState) setCategoryToUpdate(initialState)
      return newState
    })
  }

  return (
    <div>
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {loading && <div className="loading loading-bars loading-lg mb-2"></div>}
      <ShowModalBtn text="Add Category" toggleModal={toggleModal} style="btn-accent" />

      <CategoryList categories={categories} editCategory={editCategory} deleteCategory={deleteCategory} />
      <EditCategory
        category={categoryToUpdate}
        handleUpdateCategory={handleUpdateCategory}
        open={editMode}
        toggleModal={toggleModal}
      />
    </div>
  );
};

export default Page;
