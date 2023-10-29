import React from 'react'
import IInventory from '../types/inventory.type'
import Inventory from './Inventory'

// TODO include type

const InventoryList = ({ inventories, updateInventories }: any) => {
  return (
    <>
      <p className='text-center font-semibold'>STORE INVENTORY</p>
      <div className="my-8 overflow-x-auto">
        <div className="flex shadow border-b">
          <table className="min-w-full table">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  ITEM
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  PRICE
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  QUANTITY
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  CATEGORY
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  THRESHOLD
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2">
                  LAST UPDATED
                </th>
                <th className="text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {inventories?.map((inventory: IInventory) => (
                <Inventory
                  inventory={inventory}
                  key={inventory.id}
                  updateInventories={updateInventories}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default InventoryList