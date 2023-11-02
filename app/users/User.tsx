import React, { useEffect, useState } from 'react'
import IUser from '../types/user.type'
import UserBody from './UserBody'
import EditUserModal from './EditUserModal'

const User = ({ user, updateUsers }: { user: IUser, updateUsers: (user: IUser, options: { type: string }) => void }) => {
  const [updatedUser, setUpdatedUser] = useState<IUser>(user)
  const [editUserModalOpen, setEditUserModalOpen] = useState<boolean>(false)

  useEffect(() => { setUpdatedUser(user) }, [user])

  const toggleModal = (stateFunc: any) => () => stateFunc((prev: boolean) => !prev);

  const deleteUser = () => {
    if (updatedUser) {
      updateUsers(updatedUser, { type: 'DELETE' });
    }
  };

  const updateUser = (updatedUser: IUser) => {
    setUpdatedUser(updatedUser);
    updateUsers(updatedUser, { type: 'UPDATE' });
  };

  return updatedUser ? (
    <>
      <UserBody
        appUser={updatedUser}
        deleteUser={deleteUser}
        openEditUserModal={toggleModal(setEditUserModalOpen)}
      />
      <EditUserModal
        open={editUserModalOpen}
        toggleModal={toggleModal(setEditUserModalOpen)}
        updateUser={updateUser}
        user={updatedUser}
      />
    </>
  ) : null;
}

export default User