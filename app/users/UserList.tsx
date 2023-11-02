import React, { useState, useEffect } from 'react'
import IUser from '../types/user.type';
import User from './User';

const UserList = ({ users = [], updateUsers }: any) => {
  const [appUsers, setAppUsers] = useState(users);

  useEffect(() => {
    setAppUsers(users)
  }, [users])

  return (
    <div className="my-8 overflow-x-auto">
      <div className="flex shadow border-b">
        <table className="min-w-full table">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                ID
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                NAME
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                USERNAME
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                EMAIL
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                ROLE
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {appUsers?.map((user: IUser) => (
              <User
                user={user}
                key={user.id}
                updateUsers={updateUsers}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList