import React, { useState, useEffect } from 'react'
import FormErrors from '../types/formErrors.type';
import Select from 'react-tailwindcss-select';
import DialogModal from '../components/DialogModal';
import IOrderStatus from '../types/orderStatus.type';
import AuthService from '../services/auth.service';

type ChangeStatusModalProps = {
  status: IOrderStatus;
  changeStatus: (status: IOrderStatus) => void;
  open: boolean;
  toggleModal: () => void;
};

const statusOptions = Object.values(IOrderStatus);

const ChangeStatusModal = ({ status, changeStatus, open, toggleModal }: ChangeStatusModalProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isStatusValid, setIsStatusValid] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<IOrderStatus | null>(status);

  useEffect(() => {
    setUpdatedStatus(status)
  }, [status])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {};
      // Only store manager or admin can approve or cancel an order
      if ((updatedStatus == IOrderStatus.APPROVED) ||
        (updatedStatus == IOrderStatus.CANCELED)) {
        if (!AuthService.isManager() && !AuthService.isAdmin()) {
          newErrors.status = 'Only Admin & Managers can APPROVE/CANCEL orders';
        }
      }

      if (updatedStatus == IOrderStatus.DELIVERED && status !== IOrderStatus.APPROVED) {
        newErrors.status = 'Only APPROVED orders can be DELIVERED';
      }

      if (updatedStatus == status) {
        newErrors.status = 'Please select a new status';
      }

      setErrors(newErrors)
      setIsStatusValid(Object.keys(newErrors).length === 0);
    }
    validateForm()
  }, [updatedStatus, status])

  const handleChange = (data: any) => {
    setUpdatedStatus(data.value)
  }

  const handleSubmit = () => {
    if (!isStatusValid) return;
    updatedStatus && changeStatus(updatedStatus);
    toggleModal()
    setUpdatedStatus(null)
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="Change Order Status"
    >
      <div className='mt-3'>

        <Select
          placeholder="Select a Status..."
          value={updatedStatus ? { value: updatedStatus, label: updatedStatus } : null}
          primaryColor={"indigo"}
          onChange={handleChange}
          options={statusOptions.map((option) => ({ value: option, label: option }))}
        />
        {errors.status && <div className="text-xs alert-danger text-error">{errors.status}</div>}
      </div>
    </DialogModal>
  )
}

export default ChangeStatusModal