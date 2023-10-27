import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, useEffect } from "react";
import FormErrors from '../types/formErrors.type';
import IStore from "../types/store.type";
import IStoreType from "../types/storeType.type";

type EditStoreProps = {
  store: IStore;
  handleUpdateStore: (updatedStore: IStore) => void;
  open: boolean;
  toggleModal: () => void;
};

const date = new Date();
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-based.
const day = String(date.getDate()).padStart(2, '0');
const today = `${year}/${month}/${day}`;

const initialState: IStore = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: IStoreType.RETAIL,
  openingDate: ''
};


const EditStore = ({ store = initialState, handleUpdateStore, open, toggleModal }: EditStoreProps) => {
  const [updatedStore, setUpdatedStore] = useState<IStore>(store);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setUpdatedStore(store)
  }, [store])


  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {}
      const { name, email, phone, openingDate, type, address } = updatedStore;

      if (!name) {
        newErrors.name = 'Name is required'
      }

      if (email && !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid.';
      }

      if (!phone) {
        newErrors.phone = 'Phone is required';
      } else if (!/^(\+\d{1,3})?\d{10,14}$/.test(phone)) {
        newErrors.phone = 'Phone number should have 10 to 14 digits and an optional + prefix';
      }

      if (!(new Date(openingDate))) {
        newErrors.openingDate = 'Opening Date is required';
      } else if ((new Date(openingDate)) < (new Date(today))) {
        newErrors.openingDate = 'Opening Date can\'t be in the past';
      }

      if (!type) {
        newErrors.type = 'A Store Type is required';
      }

      if (!address) {
        newErrors.address = 'An Address is required';
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [updatedStore])

  const handleChange = (event: any) => {
    const value = event.target.value;
    setUpdatedStore({ ...updatedStore, [event.target.name]: value });
  };

  const updateStore = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) return;
    handleUpdateStore(updatedStore)
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md" >
              <Dialog.Panel>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Add / Update Store
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
                        value={updatedStore.name}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"
                      >
                      </input>
                      {errors.name && <div className="text-xs alert-danger text-error">{errors.name}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        value={updatedStore.email}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.email && <div className="text-xs alert-danger text-error">{errors.email}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        value={updatedStore.phone}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.phone && <div className="text-xs alert-danger text-error">{errors.phone}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={updatedStore.address}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.address && <div className="text-xs alert-danger text-error">{errors.address}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                        htmlFor="openingDate"
                      >
                        Opening Date
                      </label>
                      <input
                        type="date"
                        name="openingDate"
                        value={updatedStore.openingDate}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                      {errors.openingDate && <div className="text-xs alert-danger text-error">{errors.openingDate}</div>}
                    </div>
                    <div className="my-4">
                      <select name="type" onChange={(e) => handleChange(e)} value={updatedStore.type} className={`select select-secondary w-full`}>
                        {Object.values(IStoreType).map((item) => (
                          <option value={item} key={item}>{item}</option>
                        ))}
                      </select>
                      {errors.type && <div className="text-xs alert-danger text-error">{errors.type}</div>}
                    </div>
                    <div className="mt-6 space-x-4">
                      <button
                        onClick={updateStore}
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

export default EditStore;