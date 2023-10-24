import React from 'react'
import IStore from '../types/store.type'
import Store from './Store'

const StoreList = ({ stores, loading, deleteStore, editStore }: any) => {
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
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  NAME
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  PHONE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  OPENING DATE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  TYPE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  EMAIL
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0">
                  ADDRESS
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-0"></th>
              </tr>
            </thead>
            {!loading && (
              <tbody className="bg-white">
                {stores?.map((store: IStore) => (
                  <Store
                    store={store}
                    key={store.id}
                    deleteStore={deleteStore}
                    editStore={editStore}
                  />
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </>
  )
}

export default StoreList