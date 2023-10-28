import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, useEffect } from "react";
import CurrencyInput from 'react-currency-input-field';
import FormErrors from '../types/formErrors.type';
import IItem from "../types/item.type";
import CategoryService from "../services/category.service";
import ICategory from "../types/category.type";
import Select from "react-tailwindcss-select";

type EditItemProps = {
  item: IItem;
  handleUpdateItem: (updatedItem: IItem) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState: IItem = {
  name: '',
  shortDescription: '',
  longDescription: '',
  price: 0,
  quantity: 0,
};

const EditItem = ({ item = initialState, handleUpdateItem, open, toggleModal }: EditItemProps) => {
  const [updatedItem, setUpdatedItem] = useState<IItem>(item);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getAllCategories();
        setCategories(response.data);
      } catch (err: any) {
        let errMsg = 'Unable to load categories'
        if (err.response) {
          errMsg = err.response.data?.message;
        }
        console.error(errMsg)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    setUpdatedItem(item)
  }, [item])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {}
      const { shortDescription, name, price, quantity, category } = updatedItem;

      if (!name) {
        newErrors.name = 'Name is required'
      }

      if (!shortDescription) {
        newErrors.shortDescription = 'Short Description is required'
      } else if (shortDescription.length < 10 || shortDescription.length > 255) {
        newErrors.shortDescription = 'Short Description must have between 10 to 255  characters'
      }

      if (!price || price <= 0) {
        newErrors.price = 'Price is required'
      }

      if (!quantity || quantity < 0) {
        newErrors.quantity = 'Quantity is required'
      } else if (!Number.isInteger(Number(quantity))) {
        newErrors.quantity = 'Quantity must be integer'
      }

      if (!category) {
        newErrors.category = 'A Category is required'
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [updatedItem])

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUpdatedItem({ ...updatedItem, [name]: value });
  };

  const handleSelectChange = (data: any) => {
    setUpdatedItem({ ...updatedItem, category: JSON.parse(data.value) });
  }

  const updateItem = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) return;
    handleUpdateItem(updatedItem)
    setUpdatedItem(initialState)
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={toggleModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-md" >
              <Dialog.Panel>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Add / Update Item
                </Dialog.Title>
                <div className="max-w-md max-auto">
                  <div>
                    <div className="my-4">
                      <label htmlFor="name"
                        className="block text-sm font-medium text-gray-500"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={updatedItem.name}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"
                      >
                      </input>
                      {errors.name && <div className="text-xs alert-danger text-error">{errors.name}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="shortDescription"
                      >
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="shortDescription"
                        value={updatedItem.shortDescription}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.shortDescription && <div className="text-xs alert-danger text-error">{errors.shortDescription}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="longDescription"
                      >
                        Long Description
                      </label>
                      <input
                        type="textArea"
                        name="longDescription"
                        value={updatedItem.longDescription}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="price"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={updatedItem.price}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.price && <div className="text-xs alert-danger text-error">{errors.price}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="quantity"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={updatedItem.quantity}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.quantity && <div className="text-xs alert-danger text-error">{errors.quantity}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="category"
                      >
                        Category
                      </label>
                      <Select
                        primaryColor={"indigo"}
                        placeholder='Select a Category...'
                        value={updatedItem.category ? { value: JSON.stringify(updatedItem.category), label: updatedItem.category?.name } : null}
                        onChange={handleSelectChange}
                        options={categories.map((category) => ({ value: JSON.stringify(category), label: category.name }))}
                      />
                      {errors.category && <div className="text-xs alert-danger text-error">{errors.category}</div>}
                    </div>
                    <div className="mt-6 space-x-4">
                      <button
                        onClick={updateItem}
                        className="btn btn-secondary">
                        Submit
                      </button>
                      <button
                        onClick={toggleModal}
                        className="btn btn-error">
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition >
  );
};

export default EditItem;