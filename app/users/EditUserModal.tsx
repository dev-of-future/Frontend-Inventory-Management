import React, { useState, useEffect } from 'react'
import IStore from '../types/store.type';
import IUserRole from '../types/userRole.type';
import IUser from '../types/user.type';
import StoreService from '../services/store.service';
import DialogModal from '../components/DialogModal';
import Select from 'react-tailwindcss-select';
import UserStoreList from './UserStoreList';
import UserService from '../services/user.service';

type EditUserModalProps = {
  user: IUser;
  updateUser: (user: IUser) => void;
  open: boolean;
  toggleModal: () => void;
};

const initialState: IUser = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  roles: [],
  stores: [],
}

const EditUserModal = ({ user = initialState, updateUser, open, toggleModal }: EditUserModalProps) => {
  const [updatedUser, setUpdatedUser] = useState<IUser>(user);
  const [stores, setStores] = useState<IStore[]>([]);

  useEffect(() => {
    setUpdatedUser(user);
  }, [user]);

  const handleSubmit = () => {
    updatedUser && updateUser(updatedUser);
    toggleModal();
    setUpdatedUser(initialState)
  };

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

  const handleSelectChange = (data: any, name: string) => {
    const value = (data || []).map(({ value }: { value: string }) => JSON.parse(value));
    const user: IUser = { ...updatedUser, [name]: value };
    setUpdatedUser(user);
  }

  const removeStore = (storeId: number) => {
    const user: IUser = {
      ...updatedUser,
      stores: (updatedUser.stores || []).filter((store: IStore) => store.id !== storeId)
    }
    setUpdatedUser(user);
  }

  return (
    <DialogModal
      open={open}
      toggleModal={toggleModal}
      handleSubmit={handleSubmit}
      header="User Info">
      <>
        <div className='py-1 pb-2 flex justify-between font-semibold'>
          <div>
            <p>Name: {`${updatedUser.firstName} ${updatedUser.lastName}`}</p>
            <p>Store Count: {updatedUser.stores?.length}</p>
          </div>
          <p>Username: {updatedUser.username}</p>
        </div>
        <div className='mt-4'>
          <div>
            <label
              htmlFor="roles"
              className="block text-sm font-medium text-gray-700"
            >
              User Role Selection
            </label>
            <Select
              placeholder="Select User Role..."
              value={updatedUser.roles ? updatedUser.roles.map(role => ({ value: JSON.stringify(role), label: role })) : null}
              primaryColor="indigo"
              isMultiple={true}
              onChange={(data: any) => handleSelectChange(data, 'roles')}
              options={[IUserRole.ROLE_STORE_MANAGER, IUserRole.ROLE_STORE_STAFF].map((role) => ({ value: JSON.stringify(role), label: role }))}
            />
          </div>
          <div className='mt-3'>
            <label
              htmlFor="stores"
              className="block text-sm font-medium text-gray-700"
            >
              User Stores Selection
            </label>
            <Select
              placeholder="Select a Store..."
              value={updatedUser.stores ? updatedUser.stores.map(store => ({ value: JSON.stringify({ id: store.id, name: store.name }), label: store.name })) : null}
              primaryColor="indigo"
              isMultiple={true}
              onChange={(data: any) => handleSelectChange(data, 'stores')}
              options={stores.map((store) => ({ value: JSON.stringify({ id: store.id, name: store.name }), label: store.name }))}
            />
          </div>
        </div>

        {updatedUser?.stores && <UserStoreList stores={updatedUser.stores} removeStore={removeStore} />}
      </>
    </DialogModal>
  )
}

export default EditUserModal