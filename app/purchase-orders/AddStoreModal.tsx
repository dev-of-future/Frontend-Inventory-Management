import React, { useState, useEffect } from 'react'
import FormErrors from '../types/formErrors.type';
import IStore from '../types/store.type';
import StoreService from '../services/store.service';
import Select from 'react-tailwindcss-select';
import DialogModal from '../components/DialogModal';

type AddStoreModalProps = {
  store: IStore | null;
  addStore: (store: IStore) => void;
  open: boolean;
  toggleModal: () => void;
};

const AddStoreModal = ({ store, addStore, open, toggleModal }: AddStoreModalProps) => {
  const [stores, setStores] = useState<IStore[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [updatedStore, setUpdatedStore] = useState<IStore | null>(store);

  useEffect(() => {
    setUpdatedStore(store)
  }, [store])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};

      if (!updatedStore?.name) {
        newErrors.store = 'Store is required';
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }
    validateForm()
  }, [updatedStore])

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStores();
        setStores(response.data);
      } catch (error: any) {
        const errMsg = error.response?.data?.message ? error.response.data.message : 'Unable to load stores';
        console.error(errMsg)
      }
    }

    fetchStores()
  }, [])

  const handleChange = (data: any) => {
    setUpdatedStore(JSON.parse(data.value))
  }

  const handleSubmit = () => {
    if (!isFormValid) return;
    updatedStore?.name && addStore(updatedStore);
    toggleModal()
    setUpdatedStore(null);
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="Select Store"
    >
      <Select
        placeholder="Select a Store..."
        value={updatedStore ? { value: JSON.stringify(updatedStore), label: updatedStore.name } : null}
        primaryColor={"indigo"}
        onChange={handleChange}
        options={stores.map((store) => ({ value: JSON.stringify(store), label: store.name }))}
      />
      {errors.store && <div className="text-xs alert-danger text-error">{errors.store}</div>}
    </DialogModal>
  )
}

export default AddStoreModal