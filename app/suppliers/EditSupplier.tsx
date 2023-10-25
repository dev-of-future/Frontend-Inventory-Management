import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, useEffect } from "react";
import FormErrors from '../types/formErrors.type';
import ISupplier from "../types/supplier.type";

type EditSupplierProps = {
  supplier: ISupplier;
  handleUpdateSupplier: (updatedSupplier: ISupplier) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState: ISupplier = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const EditSupplier = ({ supplier = initialState, handleUpdateSupplier, open, toggleModal }: EditSupplierProps) => {
  const [updatedSupplier, setUpdatedSupplier] = useState<ISupplier>(supplier);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setUpdatedSupplier(supplier)
  }, [supplier])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {}
      const { email, name, phone } = updatedSupplier;

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

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [updatedSupplier])

  const handleChange = (event: any) => {
    const value = event.target.value;
    setUpdatedSupplier({ ...updatedSupplier, [event.target.name]: value });
  };

  const updateSupplier = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) return;
    handleUpdateSupplier(updatedSupplier)
    setUpdatedSupplier(initialState)
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
                  Add / Update Supplier
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
                        value={updatedSupplier.name}
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
                        value={updatedSupplier.email}
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
                        value={updatedSupplier.phone}
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
                        value={updatedSupplier.address}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"></input>
                    </div>
                    <div className="mt-6 space-x-4">
                      <button
                        onClick={updateSupplier}
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

export default EditSupplier;