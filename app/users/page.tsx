'use client'
import React, { useState, useEffect } from 'react'
import IUser from '../types/user.type';
import AppUserService from '../services/user.service';
import UserList from './UserList';
import ShowModalBtn from '../components/ShowModalBtn';
import AddUserModal from './AddUserModal';

const Page = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [newUserModalOpen, setnewUserModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true)
    const fetchUsers = async () => {
      try {
        const response = await AppUserService.getAllUsers();
        setUsers(response.data);
        setError('')
      } catch (error: any) {
        let errMsg = 'Unexpected error';
        if (error.response) {
          errMsg = (error.response.data.message);
        }
        setError(errMsg);
      }
      setLoading(false)
    }
    fetchUsers()
  }, []);

  const displayNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const toggleNewUserModal = () => {
    setnewUserModalOpen((newUserModalOpen) => !newUserModalOpen)
  }

  const updateUsers = async (user: IUser, action: { type: string }) => {
    if (!user.id) return;
    try {
      switch (action.type) {
        case 'DELETE':
          await AppUserService.deleteUser(user.id)

          setUsers((users) => {
            return users.filter((u) => u.id !== user.id)
          })

          displayNotification('User deleted successfully');
          break;
        case 'UPDATE':
          const res = await AppUserService.updateUser(user.id, user)

          setUsers((users) => {
            return users.map((u) => {
              if (u.id === user.id) {
                return res.data
              }
              return u
            })
          })

          displayNotification('User updated successfully');
          break;
        default:
      }
    } catch (error: any) {
      let errMsg = 'Unexpected error'
      if (error?.response) {
        errMsg = error.response.data?.message;
      }
      displayNotification(errMsg);
    }
  }

  const createNewUser = async (user: IUser) => {
    const res = await AppUserService.createUser(user)
    setUsers((users) => {
      return [...users, res.data]
    })
    displayNotification('User added successfully');
  }

  return (
    <>
      {loading && <div className="block loading loading-bars loading-lg mb-2"></div>}
      {error && <div className="alert alert-danger mb-2">{error}</div>}
      {notification && <div onClick={() => setNotification('')} className='toast toast-end toast-bottom'><div className="alert alert-info text-white p-2">{notification}</div></div>}

      <ShowModalBtn text="Create New User" toggleModal={toggleNewUserModal} style="btn-accent" />

      <AddUserModal
        open={newUserModalOpen}
        toggleModal={toggleNewUserModal}
        addUser={createNewUser}
      />

      <UserList users={users} updateUsers={updateUsers} />
    </>
  )
}

export default Page