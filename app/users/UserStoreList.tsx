import React, { useEffect, useState } from 'react'
import IStore from '../types/store.type';

const UserStoreList = ({ stores, removeStore }: { stores: IStore[], removeStore: (id: number) => void }) => {
  const [storeList, setStoreList] = useState(stores);

  useEffect(() => { setStoreList(stores) }, [stores])

  return (
    <>
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
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stores.map((store: IStore) => (
                store.id ? (
                  <tr key={store.id}>
                    <td className="text-left px-2 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{store.id}</span>
                    </td>
                    <td className="cursor-pointer text-left px-2 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-500">
                        {store.name}
                      </span>
                    </td>
                    <td className="text-right px-2 py-3 whitespace-nowrap flex gap-2">
                      <svg onClick={() => removeStore(store.id as number)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:fill-[#e11d48] cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                    </td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default UserStoreList