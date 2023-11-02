import React, { useState, useEffect, ChangeEventHandler } from 'react'
import FormErrors from '../types/formErrors.type';
import DialogModal from '../components/DialogModal'
import IUser from '../types/user.type';

type AddUserModalProps = {
  user?: IUser;
  addUser: (user: IUser) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  username: '',
}

const AddUserModal = ({ user = initialState, toggleModal, open, addUser }: AddUserModalProps) => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IUser>(user);

  useEffect(() => {
    setUpdatedUser(user)
  }, [user])

  useEffect(() => {
    const validateForm = () => {
      const newErrors: FormErrors = {}
      const { username, firstName, lastName, email, password } = updatedUser || {};

      if (!username) {
        newErrors.username = 'Username is required'
      } else if (username.length < 4) {
        newErrors.username = 'Username must be at least 4 characters'
      }

      if (!firstName) {
        newErrors.firstName = 'First name is required'
      }

      if (!lastName) {
        newErrors.lastName = 'Last name is required'
      }

      if (!email) {
        newErrors.email = 'Email is required.';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid.';
      }

      if (!password) {
        newErrors.password = 'Password is required'
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters'
      }

      setErrors(newErrors)
      setIsFormValid(Object.keys(newErrors).length === 0);
    }

    validateForm()
  }, [updatedUser])

  const handleChange = (event: any) => {
    event.preventDefault()
    const { name, value } = event.target as HTMLInputElement;
    const newUser: IUser = { ...updatedUser, [name]: value }
    setUpdatedUser(newUser);
  }

  const handleSubmit = () => {
    if (!isFormValid) return;
    updatedUser && addUser(updatedUser);
    toggleModal();
    setUpdatedUser(initialState)
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="Add User"
    >
      <div className="mt-8 grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            autoComplete='off'
            aria-autocomplete="none"

            type="text"
            id="firstName"
            value={updatedUser?.firstName}
            onChange={handleChange}
            name="firstName"
            className="pl-1 mt-1 w-full rounded-md border-gray-600 border-2 bg-white text-md text-gray-700 shadow-sm"
          />
          {errors.firstName && <div className="alert-danger text-error text-sm">{errors.firstName}</div>}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            autoComplete='off'
            aria-autocomplete="none"

            type="text"
            id="lastName"
            name="lastName"
            value={updatedUser?.lastName}
            onChange={handleChange}
            className="pl-1 mt-1 w-full rounded-md border-gray-600 border-2 bg-white text-md text-gray-700 shadow-sm"
          />
          {errors.lastName && <div className="alert-danger text-error text-sm">{errors.lastName}</div>}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            autoComplete='off'
            aria-autocomplete="none"

            type="email"
            id="email"
            name="email"
            value={updatedUser?.email}
            onChange={handleChange}
            className="pl-1 mt-1 w-full rounded-md border-gray-600 border-2 bg-white text-md text-gray-700 shadow-sm"

          />
          {errors.email && <div className="alert-danger text-error text-sm">{errors.email}</div>}
        </div>

        <div className="col-span-6 sm:col-span-3">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>

          <input
            autoComplete='off'
            aria-autocomplete="none"
            type="username"
            id="username"
            name="username"
            value={updatedUser?.username}
            onChange={handleChange}
            className="pl-1 mt-1 w-full rounded-md border-gray-600 border-2 bg-white text-md text-gray-700 shadow-sm"

          />
          {errors.username && <div className="alert-danger text-error text-sm">{errors.username}</div>}
        </div>

        <div className="col-span-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            autoComplete='off'
            aria-autocomplete="none"
            type="input"
            id="password"
            name="password"
            value={updatedUser?.password}
            onChange={handleChange}
            className="pl-1 mt-1 w-full rounded-md border-gray-600 border-2 bg-white text-md text-gray-700 shadow-sm"

          />
          {errors.password && <div className="alert-danger text-error text-sm">{errors.password}</div>}
        </div>
      </div>
    </DialogModal>
  )
}

export default AddUserModal