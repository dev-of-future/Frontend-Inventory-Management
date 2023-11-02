import React, { useEffect, useState } from 'react'
import IUserRole from '../types/userRole.type';

const UserBody = ({ appUser, openEditUserModal, deleteUser }: any) => {
  const [user, setUser] = useState(appUser);

  useEffect(() => { setUser(appUser) }, [appUser])

  return (
    <tr key={user.id}>
      <td className="cursor-pointer text-left px-2 py-3 overflow-x-scroll">
        <span className="text-sm text-gray-500">
          {user.id}
        </span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500 flex gap-1">{`${user.firstName} ${user.lastName}`}</span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">{user.username}</span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">{user.email}</span>
      </td>
      <td className="text-left px-2 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500 flex gap-1">
          {user.roles?.map((role: IUserRole, i: number) => (
            <li key={i} className="badge badge-primary">
              {role.split('_')
                .slice(1)
                .join(' ')}
            </li>
          ))}
        </span>
      </td>
      <td className="text-right px-2 py-3 whitespace-nowrap flex gap-2">
        <svg onClick={openEditUserModal} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#60a5fa] cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <svg onClick={deleteUser} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#e11d48] cursor-pointer">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </td>
    </tr>
  );
}

export default UserBody