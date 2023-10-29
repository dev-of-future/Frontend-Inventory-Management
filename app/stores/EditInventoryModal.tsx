import React, { useState, useEffect } from 'react'
import FormErrors from '../types/formErrors.type';
import DialogModal from '../components/DialogModal';
import IInventory from '../types/inventory.type';
import UserService from '../services/user.service';

type EditInventoryModalProps = {
  inventory: IInventory;
  updateInventory: (field: any) => void;
  open: boolean;
  toggleModal: () => void;
};

const EditInventoryModal = ({ inventory, updateInventory, open, toggleModal }: EditInventoryModalProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isStatusValid, setIsStatusValid] = useState(false);
  const [updatedInventory, setUpdatedInventory] = useState<IInventory>(inventory);

  useEffect(() => {
    setUpdatedInventory(inventory)
  }, [inventory])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};

      // Only store manager or admin can update threshold
      if (updatedInventory?.threshold != inventory.threshold) {
        if (!UserService.isManager() && !UserService.isAdmin()) {
          newErrors.threshold = 'Only Admin & Managers can UPDATE threshold';
        }
      }

      setErrors(newErrors)
      setIsStatusValid(Object.keys(newErrors).length === 0);
    }
    validateForm()
  }, [updatedInventory, inventory.threshold])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedInventory((updatedInventory) => ({ ...updatedInventory, [name]: value }));
  }

  const handleSubmit = () => {
    if (!isStatusValid) return;
    updatedInventory && updateInventory(updatedInventory);
    toggleModal()
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="Update Inventory"
    >
      <div className='mt-3'>
        <div className='mt-5 flex gap-4'>
          <div>
            <label htmlFor="quantity"
              className="block text-sm font-medium text-gray-500"
            >
              Quantity
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="quantity"
              value={updatedInventory.quantity}
              max={inventory.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <div className="text-xs alert-danger text-error">{errors.quantity}</div>}
          </div>
          <div>
            <label htmlFor="threshold"
              className="block text-sm font-medium text-gray-500"
            >
              Threshold
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="number"
              name="threshold"
              value={updatedInventory.threshold}
              onChange={handleChange}
            />
            {errors.threshold && <div className="text-xs alert-danger text-error">{errors.threshold}</div>}
          </div>
        </div>
      </div>
    </DialogModal>
  )
}

export default EditInventoryModal