import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment } from "react";
import SupplierService from "../services/supplier.service";

const EditSupplier = ({ supplierCurrInfo, setSelectedSupplier }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supplier, setSupplier] = useState(supplierCurrInfo);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleChange = (event: any) => {
    const value = event.target.value;
    setSupplier({ ...supplier, [event.target.name]: value });
  };

  const reset = (e: any) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const updateSupplier = async (e: any) => {
    e.preventDefault();
    try {
      const response = await SupplierService.updateSupplier(supplierCurrInfo.id, supplier);
      setSelectedSupplier(response.data);
      reset(e);
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900">
                Update Supplier
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={supplier.name}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={supplier.email}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Phone
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={supplier.phone}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={supplier.address}
                      onChange={(e) => handleChange(e)}
                      className="h-10 w-96 border mt-2 px-2 py-2"></input>
                  </div>
                  <div className="h-14 my-4 space-x-4 pt-4">
                    <button
                      onClick={updateSupplier}
                      className="rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6">
                      Update
                    </button>
                    <button
                      onClick={reset}
                      className="rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditSupplier;