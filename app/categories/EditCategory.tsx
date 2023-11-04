import { Dialog, Transition } from "@headlessui/react";
import React, { useState, Fragment, useEffect } from "react";
import FormErrors from '../types/formErrors.type';
import CategoryService from "../services/category.service";
import ICategory from "../types/category.type";
import Select from "react-tailwindcss-select";
import SupplierService from "../services/supplier.service";
import ISupplier from "../types/supplier.type";

type EditCategoryProps = {
  category: ICategory;
  handleUpdateCategory: (updatedCategory: ICategory) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState: ICategory = {
  name: '',
};

const EditCategory = ({ category = initialState, handleUpdateCategory, open, toggleModal }: EditCategoryProps) => {
  const [updatedCategory, setUpdatedCategory] = useState<ICategory>(category);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [suppliers, setSuppliers] = useState<ISupplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await SupplierService.getAllSuppliers();
        setSuppliers(response.data);
      } catch (err: any) {
        let errMsg = 'Unable to load categories'
        if (err.response) {
          errMsg = err.response.data?.message;
        }
        console.error(errMsg)
      }
    }
    fetchSuppliers()
  }, [])

  useEffect(() => {
    setUpdatedCategory(category)
  }, [category])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {}
      const { name, supplier } = updatedCategory;

      if (!name) {
        newErrors.name = 'Name is required'
      }

      if (!supplier) {
        newErrors.supplier = 'A Supplier is required'
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [updatedCategory])

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;

    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleSelectChange = (data: any) => {
    setUpdatedCategory({ ...updatedCategory, supplier: JSON.parse(data.value) });
  }

  const updateCategory = async (e: any) => {
    e.preventDefault();
    if (!isFormValid) return;
    handleUpdateCategory(updatedCategory)
    setUpdatedCategory(initialState)
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
                  Add / Update Category
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
                        id="name"
                        value={updatedCategory.name}
                        onChange={(e) => handleChange(e)}
                        className="h-8 rounded w-full border px-2 py-2"
                      >
                      </input>
                      {errors.name && <div className="text-xs alert-danger text-error">{errors.name}</div>}
                    </div>
                    <div className="my-4">
                      <label
                        className="block text-sm font-medium text-gray-500"
                      >
                        Supplier
                      </label>
                      <Select
                        primaryColor={"indigo"}
                        placeholder='Select a Supplier...'
                        value={updatedCategory.supplier ? { value: JSON.stringify(updatedCategory.supplier), label: updatedCategory.supplier?.name } : null}
                        onChange={handleSelectChange}
                        options={suppliers.map((supplier) => ({ value: JSON.stringify(supplier), label: supplier.name }))}
                      />
                      {errors.supplier && <div className="text-xs alert-danger text-error">{errors.supplier}</div>}
                    </div>

                    <div className="mt-6 space-x-4">
                      <button
                        onClick={updateCategory}
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

export default EditCategory;